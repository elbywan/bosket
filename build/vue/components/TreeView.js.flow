import { object, tree } from "../../tools"
import { RootNode, defaults } from "../../core"
import { TreeViewNode } from "./TreeViewNode"
import { withLabels } from "../traits"
import { mixListener } from "../mixins"

const TreeViewBase = {
    name: "TreeView",
    mixins: [
        mixListener({ eventType: "keydown", cb: "modifierCb", autoMount: true }),
        mixListener({ eventType: "keyup",   cb: "modifierCb", autoMount: true })
    ],
    created() {
        this.rootNode = new RootNode(
            {
                get: () => ({ ...defaults, ...this.$props })
            },
            {
                onSelect:   this.$props.onSelect,
                onDrag:     this.$props.dragndrop && this.$props.dragndrop.drag,
                onDrop:     this.$props.dragndrop && this.$props.dragndrop.drop,
                onCancel:   this.$props.dragndrop && this.$props.dragndrop.cancel
            },
            {
                get: () => ({ ...this.$data }),
                set: s => {
                    for(const key in s) {
                        if(key in this.$data) this.$data[key] = s[key]
                    }
                }
            },
            this.$forceUpdate
        )
        this.modifierCb = this.rootNode.onKey
    },
    props: [ "model", "category", "selection", "onSelect", "display", "search", "transition",
        "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener", "async" ],
    data: () => ({
        searchInput: "",
        filtered: null
    }),
    methods: {
        onSearch(evt) {
            const input = evt.currentTarget.value
            this.$data.searchInput = input
            this.$data.filtered = !input.trim() ? null :
                tree(this.$props.model, this.$props.category)
                    .treeFilter(this.$props.search(input.trim()))
        }
    },
    computed: {
        computedModel() {
            return this.$props.sort ?
                this.$props.model.sort(this.$props.sort) :
                this.$props.model
        },
        wrapDragNDrop() { return this.rootNode.wrapDragNDrop() }
    },
    render() {
        const { onSelect, sort, model, ...rest } = object(this.$props).filter(prop => !!prop)
        const data = {
            props: {
                ...defaults,
                ...rest,
                model: this.computedModel,
                filteredModel: this.$data.filtered,
                onSelect: this.rootNode.onSelect,
                dragndrop: this.wrapDragNDrop,
                ancestors: [],
                sort: sort,
                folded: false,
                searched: !!this.$data.searchInput.trim()
            }
        }

        const searchBar = !this.$props.search ? null :
            <input
                type="search"
                class={ this.rootNode.mixCss("search") }
                value={ this.$data.searchInput }
                placeholder={ this.$props.labels && this.$props.labels["search.placeholder"] }
                onInput={ this.onSearch } />

        return (
            <div class={ this.rootNode.mixCss("TreeView") }>
                { searchBar }
                <TreeViewNode { ...data } />
            </div>
        )
    }
}

export const TreeView = withLabels(defaults.labels)(TreeViewBase)
