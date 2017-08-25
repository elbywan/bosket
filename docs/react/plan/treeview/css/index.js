// @flow

import React from "react"

import { csscode, htmlcode } from "../../../tools/tools"

import htmlLayout from "./html_layout"
import emptyStylesheet from "./empty_stylesheet"

export default {
    title: "Css",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/treeview/css/index.js",
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
                        Below is the <em>full HTML layout</em> of a TreeView, with the <em><a href="#TreeView#Optional properties#css">default classes</a></em>.<br/>
                        <br/>
                        For presets, replace the TreeView class with the preset css class name.
                    </p>

                    { htmlcode(htmlLayout) }
                </div>
        },
        {
            title: "Empty stylesheet",
            content:
                <div>
                    <h4>
                        <a download="bosket_empty_stylesheet.css"
                            className="anchor-button basic-button"
                            ref={ ref => {
                                if(ref) ref.href = window.URL.createObjectURL(new Blob([emptyStylesheet], { type: "text/css" }))
                            }}>
                            <i className="fa fa-download"></i>
                            Download
                        </a>
                    </h4>

                    { csscode(emptyStylesheet) }
                </div>
        }
    ]
}
