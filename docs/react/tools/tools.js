// @flow

import React from "react"

import { indent } from "self/common/tools"
import Prism from "self/common/libs/prismjs/prism"

const indentLanguage = (language, str, ...vals) =>
    <pre className={ `language-${language}` }><code className={ `language-${language}` } ref={
        ref => {
            ref.textContent = indent(str, ...vals)
            Prism.highlightElement(ref)
        }
    }></code></pre>

export const jscode     = (str: string | string[], ...vals: any[])    => indentLanguage("javascript", str, ...vals)
export const tscode     = (str: string | string[], ...vals: any[])    => indentLanguage("typescript", str, ...vals)
export const htmlcode   = (str: string | string[], ...vals: any[])    => indentLanguage("html", str, ...vals)
export const csscode    = (str: string | string[], ...vals: any[])    => indentLanguage("css", str, ...vals)
