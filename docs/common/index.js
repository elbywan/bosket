/* @flow */

import "./index.css"
import "./libs/prismjs/themes/prism-tomorrow.css"
import "./libs/dragDropTouch.js"

export * from "./tools/tools"

window.onhashchange = function(event) {
    if(window.location.hash) {
        const elt = document.getElementById(window.location.hash.substring(1))
        if(elt) elt.scrollIntoView()
    }
}
