import React from "react"

import { csscode, htmlcode } from "../../../tools/tools"

import htmlLayout from "./html_layout"
import emptyStylesheet from "./empty_stylesheet"

export default {
    title: "Css",
    content:
        <div>
            <p>
                A TreeView is basically made of multiple nested unordered lists.
                The component applies css classes to the lists and their items throughout its lifecycle.
            </p>
        </div>,
    subs: [
        {
            title: "Layout",
            content:
                <div>
                    <p>
                        Below is the <em>full HTML layout</em> of a TreeView, with the <em><a href="#TreeView#Optional props#css">default classes</a></em>.<br/>
                    </p>

                    { htmlcode(htmlLayout) }
                </div>
        },
        {
            title: "Empty stylesheet",
            content:
                <div>
                    <button className="basic-button">
                        <i className="fa fa-download"></i>
                        <a download="bosket_empty_stylesheet.css" ref={ ref => {
                            ref.href = window.URL.createObjectURL(new Blob([emptyStylesheet], {
                                type: "text/css"
                            }))
                        } }>Download</a>
                    </button>
                    { csscode(emptyStylesheet) }
                </div>
        }
    ]
}