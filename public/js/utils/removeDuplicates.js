// Array duplication removal function from https://dev.to/mshin1995/back-to-basics-removing-duplicates-from-an-array-55he
export function removeDuplicates(titles) {
    let noDupes = []
    titles.map(title => {
        if (!noDupes.includes(title)) {
            noDupes.push(title)
        }
    })
    return noDupes
}