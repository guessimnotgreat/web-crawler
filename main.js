const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

normalizeURL('https://blog.boot.dev/path/')

getURLsFromHTML(`<html>
    <body>
        <a href="/blog"><span>Go to Boot.dev</span></a>
        <a href="/videos/"><span>Go to Boot.dev</span></a>
        <a href="/review"><span>Go to Boot.dev</span></a>
    </body>
</html>
`, 'https://www.boot.dev')

