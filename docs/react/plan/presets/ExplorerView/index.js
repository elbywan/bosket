import React from "react"

import { ExplorerViewSection } from "self/react/components/Sections"

export default {
    title: "ExplorerView",
    content:
        <p>
            A file explorer like preset with drag'n'drop, multi selection using keyboard modifiers, sorted elements and search.
        </p>,
    subs: [{
        title: "Demo",
        content:
            <div>
                <h4><button className="basic-button">
                    <i className="fa fa-download"></i>
                    <a download="BosketExplorerView.css" href="./components/Sections/ExplorerView/ExplorerDemo.css">Download stylesheet</a>
                </button></h4>
                <ExplorerViewSection></ExplorerViewSection>
            </div>
    }]
}
