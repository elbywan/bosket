// @flow

import React from "react"
import { ComponentSection } from "self/react/components/ComponentSection/ComponentSection"
import { ExplorerViewWindow } from "./ExplorerViewWindow"

export const ExplorerViewSection = () =>
    <ComponentSection
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
            "./components/Sections/ExplorerView/ExplorerDemo.js",
            "./components/Sections/ExplorerView/ExplorerDemo.css",
            "./components/Sections/ExplorerView/ExplorerViewWindow.js",
            "./components/Sections/ExplorerView/ExplorerViewWindow.css",
            "./components/Sections/ExplorerView/helpers.js",
            "../common/models/ExplorerViewModel.js"
        ]}>
        <ExplorerViewWindow/>
    </ComponentSection>
