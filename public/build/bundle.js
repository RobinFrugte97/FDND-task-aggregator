
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    // Function that loops through a task's taglist to try and find a match.
    function findTag(tags, query) {
        let foundTag = false;
        tags.forEach(tag => {
            if (tag.toLowerCase().match(query)) {
                return foundTag = true
            }
        });
        return foundTag
    }

    // Function that checks if the user input matches either the title, description or the tags of a task.
    function searchList(list, query) {
        return list.filter(item => {
            if (findTag(item.tags, query.toLowerCase()) || item.title.toLowerCase().match(query.toLowerCase()) || item.description.toLowerCase().match(query.toLowerCase())) {
                return true
            }
        })
    }

    function getTaskTitles(displayTaskList) {
        let titles = [];
        displayTaskList.map(task => titles.push(task.title));
        return titles = removeDuplicates(titles)
    }

    // Array duplication removal function from https://dev.to/mshin1995/back-to-basics-removing-duplicates-from-an-array-55he

    function removeDuplicates(array) {
        let a = [];
        array.map(x => {
            if (!a.includes(x)) {
            a.push(x);
        }});
        return a
    }

    /* src\components\Tags.svelte generated by Svelte v3.31.0 */

    const file = "src\\components\\Tags.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (10:4) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "No tags";
    			add_location(p, file, 10, 8, 197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(10:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (8:4) {#each task.tags as tag}
    function create_each_block(ctx) {
    	let li;
    	let t_value = /*tag*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "svelte-1msmrhj");
    			add_location(li, file, 8, 8, 160);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*task*/ 1 && t_value !== (t_value = /*tag*/ ctx[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(8:4) {#each task.tags as tag}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let h4;
    	let t1;
    	let ul;
    	let each_value = /*task*/ ctx[0].tags;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    	}

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Tags:";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			attr_dev(h4, "class", "svelte-1msmrhj");
    			add_location(h4, file, 4, 0, 44);
    			attr_dev(ul, "class", "svelte-1msmrhj");
    			add_location(ul, file, 5, 0, 60);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*task*/ 1) {
    				each_value = /*task*/ ctx[0].tags;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block(ctx);
    					each_1_else.c();
    					each_1_else.m(ul, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Tags", slots, []);
    	let { task } = $$props;
    	const writable_props = ["task"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tags> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("task" in $$props) $$invalidate(0, task = $$props.task);
    	};

    	$$self.$capture_state = () => ({ task });

    	$$self.$inject_state = $$props => {
    		if ("task" in $$props) $$invalidate(0, task = $$props.task);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [task];
    }

    class Tags extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { task: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tags",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*task*/ ctx[0] === undefined && !("task" in props)) {
    			console.warn("<Tags> was created without expected prop 'task'");
    		}
    	}

    	get task() {
    		throw new Error("<Tags>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set task(value) {
    		throw new Error("<Tags>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Task.svelte generated by Svelte v3.31.0 */
    const file$1 = "src\\components\\Task.svelte";

    function create_fragment$1(ctx) {
    	let li;
    	let h3;
    	let t0_value = /*task*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let p0;
    	let t2;
    	let t3_value = /*task*/ ctx[0].semester + "";
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let t6_value = /*task*/ ctx[0].sprint + "";
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let t9_value = /*supportLevels*/ ctx[1][/*task*/ ctx[0]["support-level"] - 1] + "";
    	let t9;
    	let t10;
    	let tags;
    	let updating_task;
    	let t11;
    	let a;
    	let t12;
    	let a_href_value;
    	let current;

    	function tags_task_binding(value) {
    		/*tags_task_binding*/ ctx[2].call(null, value);
    	}

    	let tags_props = {};

    	if (/*task*/ ctx[0] !== void 0) {
    		tags_props.task = /*task*/ ctx[0];
    	}

    	tags = new Tags({ props: tags_props, $$inline: true });
    	binding_callbacks.push(() => bind(tags, "task", tags_task_binding));

    	const block = {
    		c: function create() {
    			li = element("li");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Semester ");
    			t3 = text(t3_value);
    			t4 = space();
    			p1 = element("p");
    			t5 = text("Sprint ");
    			t6 = text(t6_value);
    			t7 = space();
    			p2 = element("p");
    			t8 = text("Level: ");
    			t9 = text(t9_value);
    			t10 = space();
    			create_component(tags.$$.fragment);
    			t11 = space();
    			a = element("a");
    			t12 = text("Link to Github Repo");
    			attr_dev(h3, "class", "svelte-pgwoq5");
    			add_location(h3, file$1, 7, 4, 185);
    			add_location(p0, file$1, 8, 4, 212);
    			add_location(p1, file$1, 9, 4, 249);
    			add_location(p2, file$1, 10, 4, 282);
    			attr_dev(a, "href", a_href_value = /*task*/ ctx[0].url);
    			add_location(a, file$1, 13, 4, 427);
    			attr_dev(li, "class", "svelte-pgwoq5");
    			add_location(li, file$1, 6, 0, 175);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, h3);
    			append_dev(h3, t0);
    			append_dev(li, t1);
    			append_dev(li, p0);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			append_dev(li, t4);
    			append_dev(li, p1);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    			append_dev(li, t7);
    			append_dev(li, p2);
    			append_dev(p2, t8);
    			append_dev(p2, t9);
    			append_dev(li, t10);
    			mount_component(tags, li, null);
    			append_dev(li, t11);
    			append_dev(li, a);
    			append_dev(a, t12);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*task*/ 1) && t0_value !== (t0_value = /*task*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*task*/ 1) && t3_value !== (t3_value = /*task*/ ctx[0].semester + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*task*/ 1) && t6_value !== (t6_value = /*task*/ ctx[0].sprint + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty & /*task*/ 1) && t9_value !== (t9_value = /*supportLevels*/ ctx[1][/*task*/ ctx[0]["support-level"] - 1] + "")) set_data_dev(t9, t9_value);
    			const tags_changes = {};

    			if (!updating_task && dirty & /*task*/ 1) {
    				updating_task = true;
    				tags_changes.task = /*task*/ ctx[0];
    				add_flush_callback(() => updating_task = false);
    			}

    			tags.$set(tags_changes);

    			if (!current || dirty & /*task*/ 1 && a_href_value !== (a_href_value = /*task*/ ctx[0].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tags.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tags.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(tags);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Task", slots, []);
    	let { task } = $$props;
    	const supportLevels = ["Example", "Duplicate", "Experiment", "Extension", "Autonomous"];
    	const writable_props = ["task"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Task> was created with unknown prop '${key}'`);
    	});

    	function tags_task_binding(value) {
    		task = value;
    		$$invalidate(0, task);
    	}

    	$$self.$$set = $$props => {
    		if ("task" in $$props) $$invalidate(0, task = $$props.task);
    	};

    	$$self.$capture_state = () => ({ Tags, task, supportLevels });

    	$$self.$inject_state = $$props => {
    		if ("task" in $$props) $$invalidate(0, task = $$props.task);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [task, supportLevels, tags_task_binding];
    }

    class Task extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { task: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Task",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*task*/ ctx[0] === undefined && !("task" in props)) {
    			console.warn("<Task> was created without expected prop 'task'");
    		}
    	}

    	get task() {
    		throw new Error("<Task>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set task(value) {
    		throw new Error("<Task>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TaskList.svelte generated by Svelte v3.31.0 */
    const file$2 = "src\\components\\TaskList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[3] = list;
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (13:4) {:else}
    function create_else_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Loading...";
    			add_location(p, file$2, 15, 8, 487);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(13:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#each displayTaskList as task}
    function create_each_block$1(ctx) {
    	let task;
    	let updating_task;
    	let current;

    	function task_task_binding(value) {
    		/*task_task_binding*/ ctx[1].call(null, value, /*task*/ ctx[2], /*each_value*/ ctx[3], /*task_index*/ ctx[4]);
    	}

    	let task_props = {};

    	if (/*task*/ ctx[2] !== void 0) {
    		task_props.task = /*task*/ ctx[2];
    	}

    	task = new Task({ props: task_props, $$inline: true });
    	binding_callbacks.push(() => bind(task, "task", task_task_binding));

    	const block = {
    		c: function create() {
    			create_component(task.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(task, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const task_changes = {};

    			if (!updating_task && dirty & /*displayTaskList*/ 1) {
    				updating_task = true;
    				task_changes.task = /*task*/ ctx[2];
    				add_flush_callback(() => updating_task = false);
    			}

    			task.$set(task_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(task.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(task.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(task, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(10:4) {#each displayTaskList as task}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let ul;
    	let current;
    	let each_value = /*displayTaskList*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1(ctx);
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			attr_dev(ul, "class", "svelte-hdyb7h");
    			add_location(ul, file$2, 6, 0, 95);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*displayTaskList*/ 1) {
    				each_value = /*displayTaskList*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block$1(ctx);
    					each_1_else.c();
    					each_1_else.m(ul, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TaskList", slots, []);
    	let { displayTaskList } = $$props;
    	const writable_props = ["displayTaskList"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TaskList> was created with unknown prop '${key}'`);
    	});

    	function task_task_binding(value, task, each_value, task_index) {
    		each_value[task_index] = value;
    		$$invalidate(0, displayTaskList);
    	}

    	$$self.$$set = $$props => {
    		if ("displayTaskList" in $$props) $$invalidate(0, displayTaskList = $$props.displayTaskList);
    	};

    	$$self.$capture_state = () => ({ Task, displayTaskList });

    	$$self.$inject_state = $$props => {
    		if ("displayTaskList" in $$props) $$invalidate(0, displayTaskList = $$props.displayTaskList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [displayTaskList, task_task_binding];
    }

    class TaskList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { displayTaskList: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TaskList",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*displayTaskList*/ ctx[0] === undefined && !("displayTaskList" in props)) {
    			console.warn("<TaskList> was created without expected prop 'displayTaskList'");
    		}
    	}

    	get displayTaskList() {
    		throw new Error("<TaskList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set displayTaskList(value) {
    		throw new Error("<TaskList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TaskSearch.svelte generated by Svelte v3.31.0 */

    const { console: console_1 } = globals;
    const file$3 = "src\\components\\TaskSearch.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (23:4) {:else}
    function create_else_block$2(ctx) {
    	let each_1_anchor;
    	let each_value = /*taskTitles*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*taskTitles*/ 2) {
    				each_value = /*taskTitles*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(23:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (21:4) {#if searchTerm === ""}
    function create_if_block(ctx) {
    	let option;

    	const block = {
    		c: function create() {
    			option = element("option");
    			option.__value = "";
    			option.value = option.__value;
    			add_location(option, file$3, 21, 8, 524);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(21:4) {#if searchTerm === \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (24:8) {#each taskTitles as title}
    function create_each_block$2(ctx) {
    	let option;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			option.__value = option_value_value = /*title*/ ctx[5];
    			option.value = option.__value;
    			add_location(option, file$3, 24, 12, 605);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*taskTitles*/ 2 && option_value_value !== (option_value_value = /*title*/ ctx[5])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(24:8) {#each taskTitles as title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let label;
    	let t1;
    	let input;
    	let t2;
    	let datalist;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*searchTerm*/ ctx[0] === "") return create_if_block;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "Search for a task:";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			datalist = element("datalist");
    			if_block.c();
    			attr_dev(label, "for", "searchBar");
    			attr_dev(label, "class", "svelte-dcfhvj");
    			add_location(label, file$3, 9, 0, 206);
    			attr_dev(input, "type", "search");
    			attr_dev(input, "id", "searchBar");
    			attr_dev(input, "aria-label", "Search Input");
    			attr_dev(input, "list", "searchOptions");
    			attr_dev(input, "class", "svelte-dcfhvj");
    			add_location(input, file$3, 10, 0, 257);
    			attr_dev(datalist, "id", "searchOptions");
    			add_location(datalist, file$3, 19, 0, 456);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*searchTerm*/ ctx[0]);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, datalist, anchor);
    			if_block.m(datalist, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[3]),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*searchTerm*/ 1) {
    				set_input_value(input, /*searchTerm*/ ctx[0]);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(datalist, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(datalist);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TaskSearch", slots, []);
    	const dispatcher = createEventDispatcher();
    	let { searchTerm } = $$props;
    	let { taskTitles } = $$props;
    	console.log(taskTitles);
    	const writable_props = ["searchTerm", "taskTitles"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<TaskSearch> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		searchTerm = this.value;
    		$$invalidate(0, searchTerm);
    	}

    	const keyup_handler = () => {
    		dispatcher("updateSearch");
    	};

    	$$self.$$set = $$props => {
    		if ("searchTerm" in $$props) $$invalidate(0, searchTerm = $$props.searchTerm);
    		if ("taskTitles" in $$props) $$invalidate(1, taskTitles = $$props.taskTitles);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatcher,
    		searchTerm,
    		taskTitles
    	});

    	$$self.$inject_state = $$props => {
    		if ("searchTerm" in $$props) $$invalidate(0, searchTerm = $$props.searchTerm);
    		if ("taskTitles" in $$props) $$invalidate(1, taskTitles = $$props.taskTitles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [searchTerm, taskTitles, dispatcher, input_input_handler, keyup_handler];
    }

    class TaskSearch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { searchTerm: 0, taskTitles: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TaskSearch",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*searchTerm*/ ctx[0] === undefined && !("searchTerm" in props)) {
    			console_1.warn("<TaskSearch> was created without expected prop 'searchTerm'");
    		}

    		if (/*taskTitles*/ ctx[1] === undefined && !("taskTitles" in props)) {
    			console_1.warn("<TaskSearch> was created without expected prop 'taskTitles'");
    		}
    	}

    	get searchTerm() {
    		throw new Error("<TaskSearch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set searchTerm(value) {
    		throw new Error("<TaskSearch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get taskTitles() {
    		throw new Error("<TaskSearch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set taskTitles(value) {
    		throw new Error("<TaskSearch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.31.0 */

    const { console: console_1$1 } = globals;
    const file$4 = "src\\App.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let tasksearch;
    	let updating_searchTerm;
    	let updating_taskTitles;
    	let t2;
    	let tasklist;
    	let updating_displayTaskList;
    	let current;

    	function tasksearch_searchTerm_binding(value) {
    		/*tasksearch_searchTerm_binding*/ ctx[4].call(null, value);
    	}

    	function tasksearch_taskTitles_binding(value) {
    		/*tasksearch_taskTitles_binding*/ ctx[5].call(null, value);
    	}

    	let tasksearch_props = {};

    	if (/*searchTerm*/ ctx[0] !== void 0) {
    		tasksearch_props.searchTerm = /*searchTerm*/ ctx[0];
    	}

    	if (/*taskTitles*/ ctx[3] !== void 0) {
    		tasksearch_props.taskTitles = /*taskTitles*/ ctx[3];
    	}

    	tasksearch = new TaskSearch({ props: tasksearch_props, $$inline: true });
    	binding_callbacks.push(() => bind(tasksearch, "searchTerm", tasksearch_searchTerm_binding));
    	binding_callbacks.push(() => bind(tasksearch, "taskTitles", tasksearch_taskTitles_binding));
    	tasksearch.$on("updateSearch", /*updateSearch_handler*/ ctx[6]);

    	function tasklist_displayTaskList_binding(value) {
    		/*tasklist_displayTaskList_binding*/ ctx[7].call(null, value);
    	}

    	let tasklist_props = {};

    	if (/*displayTaskList*/ ctx[2] !== void 0) {
    		tasklist_props.displayTaskList = /*displayTaskList*/ ctx[2];
    	}

    	tasklist = new TaskList({ props: tasklist_props, $$inline: true });
    	binding_callbacks.push(() => bind(tasklist, "displayTaskList", tasklist_displayTaskList_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "FDND Task Overview";
    			t1 = space();
    			create_component(tasksearch.$$.fragment);
    			t2 = space();
    			create_component(tasklist.$$.fragment);
    			attr_dev(h1, "class", "svelte-1h8b34");
    			add_location(h1, file$4, 32, 1, 1016);
    			attr_dev(main, "class", "svelte-1h8b34");
    			add_location(main, file$4, 31, 0, 1007);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(tasksearch, main, null);
    			append_dev(main, t2);
    			mount_component(tasklist, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tasksearch_changes = {};

    			if (!updating_searchTerm && dirty & /*searchTerm*/ 1) {
    				updating_searchTerm = true;
    				tasksearch_changes.searchTerm = /*searchTerm*/ ctx[0];
    				add_flush_callback(() => updating_searchTerm = false);
    			}

    			if (!updating_taskTitles && dirty & /*taskTitles*/ 8) {
    				updating_taskTitles = true;
    				tasksearch_changes.taskTitles = /*taskTitles*/ ctx[3];
    				add_flush_callback(() => updating_taskTitles = false);
    			}

    			tasksearch.$set(tasksearch_changes);
    			const tasklist_changes = {};

    			if (!updating_displayTaskList && dirty & /*displayTaskList*/ 4) {
    				updating_displayTaskList = true;
    				tasklist_changes.displayTaskList = /*displayTaskList*/ ctx[2];
    				add_flush_callback(() => updating_displayTaskList = false);
    			}

    			tasklist.$set(tasklist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tasksearch.$$.fragment, local);
    			transition_in(tasklist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tasksearch.$$.fragment, local);
    			transition_out(tasklist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(tasksearch);
    			destroy_component(tasklist);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let searchTerm = "";
    	let taskList = []; /*Original copy of the data.*/
    	let displayTaskList = []; /*Copy of the data that is used to render the tasks.*/
    	let taskTitles = [];

    	/*When App.svelte mounts, this function to fetch the data will run.*/
    	onMount(async () => {
    		const dataResponse = await fetch("data.json");
    		$$invalidate(1, taskList = await dataResponse.json());
    		$$invalidate(2, displayTaskList = taskList);

    		/* SPRINT SORT */
    		// displayTaskList = sortByTaskOrder(taskList)
    		/* SPRINT SORT */
    		// Create a list of titles for the datalist search
    		$$invalidate(3, taskTitles = getTaskTitles(displayTaskList));

    		console.log(displayTaskList);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function tasksearch_searchTerm_binding(value) {
    		searchTerm = value;
    		$$invalidate(0, searchTerm);
    	}

    	function tasksearch_taskTitles_binding(value) {
    		taskTitles = value;
    		$$invalidate(3, taskTitles);
    	}

    	const updateSearch_handler = () => {
    		$$invalidate(2, displayTaskList = searchList(taskList, searchTerm));
    	};

    	function tasklist_displayTaskList_binding(value) {
    		displayTaskList = value;
    		$$invalidate(2, displayTaskList);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		searchList,
    		getTaskTitles,
    		TaskList,
    		TaskSearch,
    		searchTerm,
    		taskList,
    		displayTaskList,
    		taskTitles
    	});

    	$$self.$inject_state = $$props => {
    		if ("searchTerm" in $$props) $$invalidate(0, searchTerm = $$props.searchTerm);
    		if ("taskList" in $$props) $$invalidate(1, taskList = $$props.taskList);
    		if ("displayTaskList" in $$props) $$invalidate(2, displayTaskList = $$props.displayTaskList);
    		if ("taskTitles" in $$props) $$invalidate(3, taskTitles = $$props.taskTitles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		searchTerm,
    		taskList,
    		displayTaskList,
    		taskTitles,
    		tasksearch_searchTerm_binding,
    		tasksearch_taskTitles_binding,
    		updateSearch_handler,
    		tasklist_displayTaskList_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
