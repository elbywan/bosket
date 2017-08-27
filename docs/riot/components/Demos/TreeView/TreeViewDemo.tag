<TreeViewDemo>

    <TreeView opts={ options } />

    <p>
        <span if={ options.selection.length === 0 }>No elements are</span>
        <span if={ options.selection.length === 1 }>One element is</span>
        <span if={ options.selection.length > 1 }>{ options.selection.length } elements are</span>
        selected.
    </p>

    <div class="select-blocks">
        <button each={ item in options.selection } onclick={ updateSelection(item) }>
            { item.label }
        </button>
    </div>

    <script>
        import { string } from "bosket/tools"
        import { dragndrop } from "bosket/core/dragndrop"
        import riot from "riot"

        // Model
        import model from "self/common/models/TreeViewModel"

        import "./TreeViewDemo.css"

        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"

        riot.tag("wrapped-label", "<a>{ opts.item.label }</a>")

        this.options = {
            files: [
                "./components/Demos/TreeView/TreeViewDemo.js",
                "./components/Demos/TreeView/TreeViewDemo.css",
                "../common/models/TreeViewModel.js"
            ],
            // Data model
            model: model,
            // Property of the model containing children
            category: "items",
            selection: [],
            // On selection, update the selection array
            onselect: items => {
                this.options.selection = items
                this.update()
            },
            // Custom display
            displaytag: item => "wrapped-label",
            // Alphabetical sort
            sort: (a, b) => a.label.localeCompare(b.label),
            // Search bu regex
            search: input => i => string(i.label).contains(input),
            strategies: {
                // Use keyboard modifiers
                selection: ["modifiers"],
                // Use the opener to control element folding
                fold: ["opener-control"]
            },
            // Custom css root class name
            css: { TreeView: "TreeViewDemo" },
            dragndrop: {
                // Use the "selection" drag and drop preset
                ...dragndrop.selection(() => this.options.model, m => { this.options.model = m; this.update() }),
                // Add a custom image on drag
                drag: (_, event) => {
                    event.dataTransfer.setDragImage(this.dragImage, 0, 0)
                    event.dataTransfer.setData("application/json", JSON.stringify(this.options.selection))
                },
                // Drop only on categories or root (excluding asynchronous promises)
                droppable: _ => !_ || _.items && _.items instanceof Array
            },
            transition: {
                name: "TreeViewDemoTransition"
            }
        }
        this.updateSelection = item => event => {
            this.options.selection = this.options.selection.filter(_ => _ !== item)
        }
    </script>
</TreeViewDemo>
