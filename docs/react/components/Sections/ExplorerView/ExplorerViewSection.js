// @flow

import "./ExplorerViewSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"
import { ExplorerDemo } from "./ExplorerDemo"

import helpers from "./helpers"

export class ExplorerViewSection extends React.PureComponent {

    state = {
        lastFolder: null,
        path: "/",
        selection: []
    }

    // Render the whole explorer window //
    render = () =>
        <ComponentSection
            componentName="ExplorerView"
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
                "./components/Sections/ExplorerView/ExplorerViewSection.js",
                "./components/Sections/ExplorerView/ExplorerViewSection.css",
                "./components/Sections/ExplorerView/helpers.js",
                "../common/models/ExplorerViewModel.js"
            ]}>

            <div className="explorer-window">
                <div className="explorer-bar">
                    <div className="explorer-buttons">
                        <button className="explorer-button explorer-button-close"></button>
                        <button className="explorer-button explorer-button-min"></button>
                        <button className="explorer-button explorer-button-max"></button>
                    </div>
                    <div className="explorer-current-folder">
                        { this.state.path }
                    </div>
                </div>
                <div className="file-tree">
                    <ExplorerDemo { ...this.state } update={ this.setState.bind(this) }></ExplorerDemo>
                </div>
                <div className="folder-view">
                    { helpers.renderFolderView.bind(this)() }
                </div>
            </div>

        </ComponentSection>
}
