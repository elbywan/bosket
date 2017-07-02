// @flow

import React from "react"

import { FlatViewWindow } from "./FlatViewWindow"
import { ComponentDemo } from "self/react/components/ComponentDemo/ComponentDemo"

export const FlatViewSection = () =>
    <ComponentDemo
        componentName="Drop down category list"
        description={ <p>Flattened tree demo in the form of a combo box.</p> }
        files={[
            "./components/Demos/FlatView/FlatViewDemo.js",
            "./components/Demos/FlatView/FlatViewDemo.css",
            "./components/Demos/FlatView/FlatViewWindow.js",
            "./components/Demos/FlatView/FlatViewWindow.css",
            "../common/models/FlatViewModel.js"
        ]}>
        <FlatViewWindow/>
    </ComponentDemo>
