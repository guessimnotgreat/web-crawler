const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);

    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages;
    }

    const normalizeCurrentUrl = normalizeURL(currentUrl);

    if (pages[normalizeCurrentUrl]) {
        pages[normalizeCurrentUrl]++;
        return pages;
    } else {
        pages[normalizeCurrentUrl] = baseUrl !== currentUrl ? 1 : 0;
    }

    console.log(`Crawling: ${currentUrl}`);

    try {
        const resp = await fetch(currentUrl);

        if (!resp.ok) {
            console.error(`Error ${resp.status}: ${resp.statusText}`);
            return pages;
        }

        const contentType = resp.headers.get('Content-Type');

        if (!contentType || !contentType.includes('text/html')) {
            console.error(`Invalid response content-type`);
            return pages;
        }

        const html = await resp.text();
        const linksFromHTML = getURLsFromHTML(html, baseUrl);

        for (const link of linksFromHTML) {
            pages = await crawlPage(baseUrl, link, pages);
        }
    } catch (error) {
        console.error(`Fetching Error: ${error.message}`);
    }

    return pages;
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