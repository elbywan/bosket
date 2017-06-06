// @flow

import React from "react"

import { indent } from "../../common"

const indentLanguage = (language, str, ...vals) =>
    <pre><code className={ `language-${language}` } >{
        indent(str, ...vals)
    }</code></pre>

export const jscode     = (str: string | string[], ...vals: any[])    => indentLanguage("javascript", str, ...vals)
export const tscode     = (str: string | string[], ...vals: any[])    => indentLanguage("typescript", str, ...vals)
export const htmlcode   = (str: string | string[], ...vals: any[])    => indentLanguage("html", str, ...vals)
export const csscode    = (str: string | string[], ...vals: any[])    => indentLanguage("css", str, ...vals)
