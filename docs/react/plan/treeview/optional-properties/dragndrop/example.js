// @flow

import React from "react"

import { TreeView } from "bosket/react"
import { dragndrop } from "bosket/core"

const dragModel = [
    { name: "< Drag these items >" },
    { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
    { name: 2, children: [{ name: 21 }, { name: 22 }]},
    { name: 3 },
    { name: 4 }
]

const conf = function() {
    return {
        model: this.state.model,
        category: "children",
        selection: this.state.selection,
        onSelect: _ => this.setState({ selection: _ }),
        display: i => i.name,
        strategies: { fold: [() => false]}
    }
}

export const DragTree = class extends React.PureComponent {
    state = { selection: [], model: dragModel }
    render = () =>
        <div className="tree-sample">
            <TreeView
                { ...conf.bind(this)() }
                // Pluck preset
                dragndrop={ dragndrop.pluck(() => this.state.model, m => this.setState({ model: m })) }>
            </TreeView>
        </div>
}
export const DropTree = class extends React.PureComponent {
    state = { selection: [], model: [{ name: "< Drop items here >", children: []}]}
    render = () =>
        <div className="tree-sample">
            <TreeView
                { ...conf.bind(this)() }
                // Paste preset
                dragndrop={ dragndrop.paste(() => this.state.model, m => this.setState({ model: m })) }>
            </TreeView>
        </div>
}
