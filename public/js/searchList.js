export function searchList(list, query) {
    return list.filter(item => {
        return (
            /* Return every task of which the title matches the search query. */
            item.title.toLowerCase().match(query.toLowerCase())
        )
    })
}