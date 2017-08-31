<TreeViewDemo>

    <TreeView opts={ options } selection={ opts.selection } onselection={ opts.onselection } />

    <script>
        import { string } from "bosket/tools"
        import { dragndrop } from "bosket/core/dragndrop"
        import riot from "riot"

        // Model
        import model from "self/common/models/TreeViewModel"

        // Style
        import "./TreeViewDemo.css"

        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"

        // A custom defined tag used to wrap items on display
        riot.tag("wrappedlabel", "<a>{ opts.item.label }</a>")

        this.options = {
            // Data model
            model: model,
            // Property of the model containing children
            category: "items",
            // Wrapper tag
            displaytag: item => "wrappedlabel",
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
            // Allow css transitions on mount/unmount
            transition: {
                name: "TreeViewDemoTransition"
            }
        }
    </script>
</TreeViewDemo>
