import React from "react"

import treeview from "./treeview"
import howto from "./howto"

export default {
    title: "Components",
    content:
        <div>
            <p>
                Bosket/react contains a generic <em><a href="#Components#TreeView">TreeView component</a></em>, and <em><a href="#Components">preset components</a></em>.<br/>
                <br/>
                Presets are higher order components wrapping an already configured TreeView.<br/>
                Some presets also provide additional functionalities.<br/>
            </p>
        </div>,
    subs: [
        howto,
        treeview
    ]
}