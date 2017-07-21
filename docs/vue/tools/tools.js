import { indent } from "self/common/tools"
import Prism from "self/common/libs/prismjs/prism"

const indentLanguage = (language, str, ...vals) => ({
    mounted() {
        this.$refs.ref.textContent = indent(str, ...vals)
        Prism.highlightElement(this.$refs.ref)
    },
    render: h =>
        <pre class={ `language-${language}` }><code class={ `language-${language}` } ref="ref"></code></pre>
})

export const jscode     = (str, ...vals)    => h => h(indentLanguage("javascript", str, ...vals))
export const tscode     = (str, ...vals)    => h => h(indentLanguage("typescript", str, ...vals))
export const htmlcode   = (str, ...vals)    => h => h(indentLanguage("html", str, ...vals))
export const csscode    = (str, ...vals)    => h => h(indentLanguage("css", str, ...vals))
