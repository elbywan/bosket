// @flow

import React from "react"

import { TreeViewSection } from "self/react/components/Demos/TreeView/TreeViewSection"

export default {
    title: "Demo",
    content:
        <div>
            <h4><button className="basic-button">
                <i className="fa fa-download"></i>
                <a download="BosketTreeView.css" href="./components/Demos/TreeView/TreeViewDemo.css">Download stylesheet</a>
            </button></h4>
            <TreeViewSection></TreeViewSection>
        </div>
}
