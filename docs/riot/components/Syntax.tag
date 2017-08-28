<syntax-highlight>
    <pre class={ "language-" + language }><code class={ "language-" + language } ref="ref"><yield/></code></pre>

    <script>
        import { indent } from "self/common/tools"

        this.language = this.opts.language || "javascript"

        const makePrefix = i => {
            let str = ""
            for(let _ = 0; _ < i; _++) { str += " " }
            return str
        }
        const offsetPrefix = this.opts.offset ? makePrefix(this.opts.offset) : ""
        this.one("mount", () => {
            this.refs.ref.textContent = indent(offsetPrefix + (this.opts.content || this.refs.ref.textContent))
            window.Prism.highlightElement(this.refs.ref)
        })
    </script>
</syntax-highlight>
