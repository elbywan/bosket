import ComponentDemo from "../../ComponentDemo.vue"
import { TreeView } from "bosket/vue"
import { string } from "bosket/tools"
import { dragndrop } from "bosket/core/dragndrop"

// Model
import model from "self/common/models/TreeViewModel"

import "./TreeViewDemo.css"

export default {
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
            // On selection, update the selection array
            selection: [],
            onSelect: items => {
                this.selection = items
            },
            // Custom display (with an anchor tag)
            display: item => <a>{ item.label }</a>,
            // Alphabetical sort
            sort: (a, b) => a.label.localeCompare(b.label),
            // Unique identifier using an item name
            key: item => item.label,
            // Search bu regex
            search: input => i => string(i.label).contains(input),
            strategies: {
                // Use keyboard modifiers
                selection: ["modifiers"],
                click: [],
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
    methods: {
        deselect(item) { this.selection = this.selection.filter(i => i !== item) }
    },
    render() {
        const props = {
            props: { ...this.$data }
        }
        return (
            <ComponentDemo componentName="TreeView" description="Powerful tree of nested objects." files={ this.files }>
                <div class="inline-row">
                    <TreeView { ...props }/>
                </div>

                <p>
                    {
                        this.selection.length === 0 ? "No elements are" :
                            this.selection.length === 1 ? "One element is" :
                                this.selection.length  + " elements are"
                    } selected.
                </p>
                <div class="select-blocks">
                    { this.selection.map(item =>
                        <button onClick={evt => this.deselect(item)}>{ item.label }</button>
                    )}
                </div>

            </ComponentDemo>
        )
    }
}
