<import>
    <p>Bosket/riot is bundled in <em><a href="http://bob.yexley.net/umd-javascript-that-runs-anywhere/" target="_blank" ref="noopener noreferrer">UMD</a></em> format.</p>

    <syntax-highlight offset={ 8 }>
        /* How to register Bosket tags : */

        // ESM imports
        import "@bosket/riot"

        // Commonjs
        require("@bosket/riot")
    </syntax-highlight>

    <p>Or just include a link to the <em>@bosket/riot/bundle/riot.umd.min.js</em> file inside a script tag.</p>

    <syntax-highlight language="html" content={ htmlCode }></syntax-highlight>

    <script>
        /* eslint-disable */
        this.htmlCode = `
            <script src=".../path/to/riot.js"><\/script>
            <script src=".../path/to/riot.umd.min.js"><\/script>`
        /* eslint-enable */
    </script>
</import>
