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
    normalizeURL
}