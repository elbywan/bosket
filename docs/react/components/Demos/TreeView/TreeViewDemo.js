// @flow

import React from "react"

// Bosket imports
import { TreeView } from "bosket/react"
import { string } from "bosket/tools"
import { dragndrop } from "bosket/core/dragndrop"

// Css
import "./TreeViewDemo.css"

// Model
import model from "self/common/models/TreeViewModel"

export class TreeViewDemo extends React.PureComponent<*, *> {

    // Load the drag image once on component creation.
    constructor(props: { selection: Object[], update: Object[] => void }) {
        super(props)
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"
    }
    dragImage: Image

    // The TreeView rendering
    render = () =>
        <TreeView
            selection={ this.props.selection }
            { ...this.state }>
        </TreeView>

    // The state is passed down to the TreeView.

    // Usually the state object is much shorter.
    // Here we deliberately set a lot of properties for the sake of the example.

    state = {
        // Data model
        model: model,
        // Property of the model containing children
        category: "items",
        // On selection, update the selection array in the parent component
        onSelect: function(items: Object[]) {
            this.props.update(items)
        }.bind(this),
        // Custom display (with an anchor tag)
        display: (item: Object) => <a>{ item.label }</a>,
        // Alphabetical sort
        sort: (a: Object, b: Object) => a.label.localeCompare(b.label),
        // Unique identifier using an item name
        unique: (item: Object) => item.label,
        // Search bar algorithm
        search: (input: string) => (i: Object) => string(i.label).contains(input),
        strategies: {
            // Use keyboard modifiers
            selection: ["modifiers"],
            click: [],
            // Use the opener to control element folding
            fold: ["opener-control"]
        },
        // Custom css root class name
        css: { TreeView: "TreeViewDemo" },
        // Transitions using react transition group
        transition: {
            transitionName: "TreeViewDemoTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        },
        dragndrop: {
            // Use the "selection" drag and drop preset
            ...dragndrop.selection(() => this.state.model, m => this.setState({ model: m })),
            // Add a custom image on drag
            drag: (_, event) => {
                event.dataTransfer.setDragImage(this.dragImage, 0, 0)
                event.dataTransfer && event.dataTransfer.setData("application/json", JSON.stringify(this.props.selection))
            },
            // Drop only on categories or root (excluding asynchronous promises)
            droppable: _ => !_ || _.items && _.items instanceof Array
        }
    }
}
