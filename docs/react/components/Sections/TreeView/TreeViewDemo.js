// @flow

import React from "react"

// Bosket imports
import { TreeView } from "bosket/react"
import { string } from "bosket/tools"
import { dragndrop } from "bosket/core/dragndrop"

// Model
import model from "self/common/models/TreeViewModel"

export class TreeViewDemo extends React.PureComponent {

    // Load the drag image once on component creation.
    constructor(props: { selection: Object[], update: Object[] => void }) {
        super(props)
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.svg"
    }
    dragImage: Image

    // The state is passed down to the TreeView.

    // Usually the state object is much shorter.
    // Here we deliberately set a lot of properties for the sake of the example.

    state = {
        model: model,
        category: "items",
        onSelect: function(items) {
            this.props.update(items)
        }.bind(this),
        display: (item: Object) => <a>{ item.label }</a>,
        sort: (a: Object, b: Object) => a.label.localeCompare(b.label),
        key: (item: Object) => item.label,
        search: (input: string) => (i: Object) => string(i.label).contains(input),
        strategies: {
            selection: ["modifiers"],
            click: [],
            fold: ["opener-control"]
        },
        css: { TreeView: "TreeViewDemo" },
        transition: {
            transitionName: "TreeViewDemoTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        },
        dragndrop: {
            draggable: true,
            droppable: true,
            drag: (target: Object, event: DragEvent, ancestors: Object[], neighbours: Object[]) => {
                event.dataTransfer && event.dataTransfer.setDragImage(this.dragImage, 0, 0)
            },
            drop: (target: Object, item: Object, event: DragEvent) => {
                this.setState({
                    model: dragndrop.drops.selection(
                        target,
                        this.state.model,
                        this.state.category,
                        this.props.selection)
                })
            }
        }
    }

    // The rendering
    render = () =>
        <TreeView
            selection={ this.props.selection }
            { ...this.state }>
        </TreeView>
}
