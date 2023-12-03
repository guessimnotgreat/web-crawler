const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { sortByValue } = require('./report.js');

const testUrls = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path'
];
const expectedResultNormalizeURL = 'blog.boot.dev/path'

test.each(testUrls)(
    `Normalize "%s" to ${expectedResultNormalizeURL}`,
    url => {
        expect(normalizeURL(url)).toBe(expectedResultNormalizeURL)
    }
)

const testPathsBaseURL = 'https://boot.dev'
const testPaths = {
    '/blog': testPathsBaseURL + '/blog',
    '/videos/': testPathsBaseURL + '/videos/',
    'review': testPathsBaseURL + '/review'
}

test.each(Object.entries(testPaths))(
    'Get URL from HTML: "%s" to "%s"',
    (inputPath, expected) => {
        const testPathsHTML = `
            <html>
                <body>
                    <a href="${inputPath}"><span>Placeholder</span></a>
                </body>
            </html>
        `;
        const result = getURLsFromHTML(testPathsHTML, testPathsBaseURL);
        const expectedArr = [`${expected}`]
        expect(result).toEqual(expectedArr)
    }
)

const testSort = {
    'test.com': 24,
    'google.com': 10,
    'youtube.com': 2,
    'facebook.com': 17
}
const expectedSort = [
    ['test.com', 24],
    ['facebook.com', 17],
    ['google.com', 10],
    ['youtube.com', 2],
]

test('Test sort by value', () => {
    const test = sortByValue(testSort)
    console.log(test)
    expect(sortByValue(testSort)).toEqual(expectedSort)
})