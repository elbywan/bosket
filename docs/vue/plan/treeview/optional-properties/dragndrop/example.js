import { TreeView } from "bosket/vue"
import { dragndrop } from "bosket/core"

/* Model */
const dragModel = [
    { name: "< Drag these items >" },
    { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
    { name: 2, children: [{ name: 21 }, { name: 22 }]},
    { name: 3 },
    { name: 4 }
]

/* Common conf. */
const conf = {
    category: "children",
    onSelect: function(_) { this.selection = _ },
    display: i => i.name,
    strategies: { fold: [() => false]}
}

/* Drag only tree */
export const DragTree = {
    name: "DragTree",
    data: () => ({
        selection: [],
        model: dragModel,
        ...conf
    }),
    render: function(h) {
        const props = { props: { ...this.$data }}
        return <div class="tree-sample">
            <TreeView
                { ...props }
                // Pluck preset
                dragndrop={{ ...dragndrop.pluck(() => this.model, m => this.model = m) }}
            />
        </div>
    }
}

/* Drop only tree */
export const DropTree = {
    name: "DropTree",
    data: () => ({
        selection: [],
        model: [{ name: "< Drop items here >", children: []}],
        ...conf
    }),
    render: function(h) {
        const props = {
            props: { ...this.$data }
        }
        return <div class="tree-sample">
            <TreeView
                { ...props }
                // Paste preset + only drop on items with children
                dragndrop={{
                    ...dragndrop.paste(() => this.model, m => this.model = m),
                    droppable: item => item && item.children
                }}
            />
        </div>
    }
}
