import React from "react"

import { indent } from "../../common"


export const jscode = (str, ...vals) =>
     <pre><code className="language-javascript">{
         indent(str, ...vals)
    }</code></pre>

export const tscode = (str, ...vals) =>
     <pre><code className="language-typescript">{
         indent(str, ...vals)
    }</code></pre>

export const csscode = (str, ...vals) =>
     <pre><code className="language-css">{
         indent(str, ...vals)
    }</code></pre>