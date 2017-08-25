// @flow

// React
import React from "react"

// Style
import "./ExplorerViewWindow.css"

// Demo component
import { ExplorerDemo } from "./ExplorerDemo"

// Helpers
import helpers from "./helpers"

export class ExplorerViewWindow extends React.PureComponent<*, *> {

    state = {
        lastFolder: null,
        path: "/",
        selection: []
    }

    // Render the whole explorer window //
    render = () =>
        <div>
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
                    { /* The tree view component is rendered here. */ }
                    <ExplorerDemo { ...this.state } update={ this.setState.bind(this) }></ExplorerDemo>
                </div>
                <div className="folder-view">
                    { helpers.renderFolderView.bind(this)() }
                </div>
            </div>
        </div>
}
