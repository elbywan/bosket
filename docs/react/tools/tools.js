// @flow

import React from "react"

import { indent } from "self/common/tools"

const indentLanguage = (language, str, ...vals) =>
    <pre className={ `language-${language}` }><code className={ `language-${language}` } ref={
        ref => {
            if(!ref) return
            ref.textContent = indent(str, ...vals)
            window["Prism"].highlightElement(ref)
        }
    }></code></pre>

export const jscode     = (str: string | string[], ...vals: any[])    => indentLanguage("javascript", str, ...vals)
export const tscode     = (str: string | string[], ...vals: any[])    => indentLanguage("typescript", str, ...vals)
export const htmlcode   = (str: string | string[], ...vals: any[])    => indentLanguage("html", str, ...vals)
export const csscode    = (str: string | string[], ...vals: any[])    => indentLanguage("css", str, ...vals)
