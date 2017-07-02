// @flow

import React from "react"
import { ComponentDemo } from "self/react/components/ComponentDemo/ComponentDemo"
import { ExplorerViewWindow } from "./ExplorerViewWindow"

export const ExplorerViewSection = () =>
    <ComponentDemo
        componentName="File explorer look alike"
        description={
            <span>
                A simple file explorer, featuring :
                <ul>
                    <li>Keyboard modifiers and multi-selection (ctrl / shift)</li>
                    <li>Drag and drop (including your filesystem folders & files)</li>
                    <li>Item search</li>
                    <li>Custom item display</li>
                </ul>
            </span>
        }
        files={[
            "./components/Demos/ExplorerView/ExplorerDemo.js",
            "./components/Demos/ExplorerView/ExplorerDemo.css",
            "./components/Demos/ExplorerView/ExplorerViewWindow.js",
            "./components/Demos/ExplorerView/ExplorerViewWindow.css",
            "./components/Demos/ExplorerView/helpers.js",
            "../common/models/ExplorerViewModel.js"
        ]}>
        <ExplorerViewWindow/>
    </ComponentDemo>
