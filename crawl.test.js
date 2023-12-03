const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

const testUrls = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path'
];

const expectedResult = 'blog.boot.dev/path'

test.each(testUrls)(
    'Normalize "%s" to "%s"',
    url => {
        expect(normalizeURL(url)).toBe(expectedResult)
    }
)