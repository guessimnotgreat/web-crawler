const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    const urlArg = process.argv[2]

    if (!urlArg) {
        console.log('Invalid input: No URL provided')
        return;
    }

    if (process.argv.length > 3) {
        console.log('Invalid input: More than 1 URL provided')
        return;
    }

    console.log('===== STARTING =====')
    console.log(`Start crawling at ${urlArg}`)
    console.log('===== CRAWLING =====')
    const pages = await crawlPage(urlArg, urlArg, {})
    printReport(pages)
    console.log('===== FINISHED =====')
}

main()

