const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

function main() {
    const urlArg = process.argv[2]

    if (!urlArg) {
        console.log('Invalid input: No URL provided')
        return;
    }

    if (process.argv.length > 3) {
        console.log('Invalid input: More than 1 URL provided')
        return;
    }

    console.log(`Start crawling at ${urlArg}`)
}

main()
