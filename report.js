function printReport(crawledPages) {
    console.log('===== PRINT REPORT =====')
    const sortedPages = sortByValue(crawledPages)
    sortedPages.forEach(
        page => {
            console.log(`Found ${page[1]} internal links to ${page[0]}`)
        }
    )
}


function sortByValue(crawledPages) {
    let entries = Object.entries(crawledPages)
    return entries.sort((a, b) => b[1] - a[1])
}


module.exports = {
    printReport,
    sortByValue
}