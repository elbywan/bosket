import { TreeView } from "bosket/vue"
import { string } from "bosket/tools"
import { dragndrop } from "bosket/core/dragndrop"

// Model
import model from "self/common/models/TreeViewModel"

import "./TreeViewDemo.css"

export default {
    props: ["selection"],
    model: {
        prop: "selection",
        event: "selectionChange"
    },
    created() {
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"
    },
    data() {
        return {
            files: [
                "./components/Demos/TreeView/TreeViewDemo.js",
                "./components/Demos/TreeView/TreeViewDemo.css",
                "../common/models/TreeViewModel.js"
            ],
            // Data model
            model: model,
            // Property of the model containing children
            category: "items",
            // On selection, update the parent selection array
            onSelect: items => {
                this.$emit("selectionChange", items)
            },
            // Custom display (with an anchor tag)
            display: item => <a>{ item.label }</a>,
            // Alphabetical sort
            sort: (a, b) => a.label.localeCompare(b.label),
            // Search by regex
            search: input => i => string(i.label).contains(input),
            strategies: {
                // Use keyboard modifiers
                selection: ["modifiers"],
                // Use the opener to control element folding
                fold: ["opener-control"]
            },
            // Custom css root class name
            css: { TreeView: "TreeViewDemo" },
            // Transitions
            transition: {
                attrs: { appear: true },
                props: { name: "TreeViewDemoTransition" }
            },
            dragndrop: {
                // Use the "selection" drag and drop preset
                ...dragndrop.selection(() => this.model, m => { this.model = m }),
                // Add a custom image on drag
                drag: (_, event) => {
                    event.dataTransfer.setDragImage(this.dragImage, 0, 0)
                    event.dataTransfer.setData("application/json", JSON.stringify(this.selection))
                },
                // Drop only on categories or root (excluding asynchronous promises)
                droppable: _ => !_ || _.items && _.items instanceof Array
            }
        }
    },
    render() {
        const props = {
            props: { ...this.$data }
        }
        return (
            <TreeView selection={ this.selection } { ...props }/>
        )
    }
}
