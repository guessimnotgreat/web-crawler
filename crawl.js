const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, crawledPages) {
    const baseURLObject = new URL(baseURL)
    const currentURLObject = new URL(currentURL)

    if (currentURLObject.hostname !== baseURLObject.hostname) {
        return crawledPages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    if (crawledPages[normalizedCurrentURL] > 0) {
        crawledPages[normalizedCurrentURL]++
        return crawledPages
    } else { 
        crawledPages[normalizedCurrentURL] = 1
    }

    console.log(`Crawling: ${currentURL}`)

    try {
        const response = await fetch(currentURL)

        if (!response.ok) {
            console.error(`Error ${response.status}: ${response.statusText}`)
            return crawledPages;
        }

        const contentType = response.headers.get('Content-Type')

        if (!contentType || !contentType.includes('text/html')) {
            console.error(`Invalid response content-type`)
            return crawledPages
        }

        const html = await response.text()
        const linksFromHTML = getURLsFromHTML(html, baseURL)

        for (const link of linksFromHTML) {
            crawledPages = await crawlPage(baseURL, link, crawledPages)
        }
    } catch (error) {
        console.error(`Fetching Error: ${error.message}`)
    }

    return crawledPages
}


function getURLsFromHTML(html, baseUrl) {
    const linksList = []
    const dom = new JSDOM(html)
    const nodesList = dom.window.document.querySelectorAll('a')
    for (const node of nodesList) {
        const pathWithoutStartingSlash = node.getAttribute('href').replace(/^\//, '')
        let newUrl = null
        try {
            newUrl = new URL(pathWithoutStartingSlash, baseUrl)
        } catch (error) {
            console.log(`Invalid input: ${error.message}`)
        }
        linksList.push(newUrl.href)
    }
    return linksList
}


function normalizeURL(url) {
    let urlObj
    try {
        urlObj = new URL(url)
    } catch (error) {
        throw new Error(`Invalid url input: ${error.message}`)
    }
    const pathWithoutTrailingSlash = urlObj.pathname.replace(/\/$/, '')
    const result = `${urlObj.hostname}${pathWithoutTrailingSlash}`
    return result
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}