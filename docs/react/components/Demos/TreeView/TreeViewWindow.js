// @flow

import React from "react"

import { TreeViewDemo } from "./TreeViewDemo"

import "self/common/styles/TreeViewWindow.css"

export class TreeViewWindow extends React.PureComponent<*, *> {

    state = {
        selection: []
    }

    render = () =>
        <div className="TreeViewWindow">
            { /* The TreeView is rendered here */
                <div style={{ display: "inline-block", textAlign: "left" }}>
                    <TreeViewDemo selection={ this.state.selection } update={ _ => this.setState({ selection: _ }) }/>
                </div>
            }

            <p>
                {
                    this.state.selection.length === 0 ? "No elements are" :
                        this.state.selection.length === 1 ? "One element is" :
                            this.state.selection.length  + " elements are"
                } selected.
            </p>

            <div className="select-blocks">
                { this.state.selection.map((item, idx) =>
                    <button key={ idx }
                        onClick={ event => this.setState({ selection: this.state.selection.filter(i => i !== item) }) }>
                        { item.label }
                    </button>
                ) }
            </div>
        </div>
}
