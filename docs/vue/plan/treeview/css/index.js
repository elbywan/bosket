import { csscode, htmlcode } from "self/vue/tools"

import htmlLayout from "./html_layout"
import emptyStylesheet from "./empty_stylesheet"

const StyleSheetAnchor = {
    functional: true,
    render: h => {
        const href = {
            attrs: {
                href: window.URL.createObjectURL(new Blob([emptyStylesheet], { type: "text/css" }))
            }
        }
        return (
            <h4>
                <a  download="bosket_empty_stylesheet.css"
                    class="anchor-button basic-button"
                    { ...href }>
                    <i class="fa fa-download"></i>
                    Download stylesheet
                </a>
            </h4>
        )
    }
}

export default {
    title: "Css",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/css/index.js",
    content: h =>
        <div>
            <p>
                A TreeView is basically made of multiple nested unordered lists.
                The component applies css classes to the lists and their items throughout its lifecycle.
            </p>
        </div>,
    subs: [
        {
            title: "Layout",
            content: h =>
                <div>
                    <p>
                        Below is the <em>full HTML layout</em> of a TreeView, with the <em><a href="#TreeView#Optional properties#css">default classes</a></em>.<br/>
                    </p>

                    { htmlcode(htmlLayout)(h) }
                </div>
        },
        {
            title: "Empty stylesheet",
            content: h =>
                <div>
                    <StyleSheetAnchor/>
                    { csscode(emptyStylesheet)(h) }
                </div>
        }
    ]
}
