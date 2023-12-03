const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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


module.exports = {
    normalizeURL,
    getURLsFromHTML
}