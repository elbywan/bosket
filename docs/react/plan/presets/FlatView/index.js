import React from "react"

import { FlatViewSection } from "self/react/components/Sections"

export default {
    title: "FlatView",
    content:
        <p>
            A flat view preset, with all items unfolded (all visible) and multi selection.
        </p>,
    subs: [{
        title: "Demo",
        content:
            <div>
                <h4><button className="basic-button">
                    <i className="fa fa-download"></i>
                    <a download="BosketFlatView.css" href="./components/Sections/FlatView/FlatViewWindow.css">Download stylesheet</a>
                </button></h4>
                <FlatViewSection></FlatViewSection>
            </div>
    }]
}
