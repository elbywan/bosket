import React from "react"

import { indent } from "../../common"

const indentLanguage = (language, str, ...vals) =>
    <pre><code className={ `language-${language}` } >{
         indent(str, ...vals)
    }</code></pre>

export const jscode     = (str, ...vals)    => indentLanguage("javascript", str, ...vals)
export const tscode     = (str, ...vals)    => indentLanguage("typescript", str, ...vals)
export const htmlcode   = (str, ...vals)    => indentLanguage("html", str, ...vals)
export const csscode    = (str, ...vals)    => indentLanguage("css", str, ...vals)