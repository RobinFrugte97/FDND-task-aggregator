export function searchList(list, query) {
    return list.filter(item => {
        return (
            /* Return every task of which the title and/or the description matches the search query. */
            item.title.toLowerCase().match(query.toLowerCase()) ||
            item.description.toLowerCase().match(query.toLowerCase())
        )
    })
}