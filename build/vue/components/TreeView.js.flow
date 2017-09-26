import { object, tree } from "../../tools"
import { RootNode, defaults } from "../../core"
import { TreeViewNode } from "./TreeViewNode"
import { combine, withLabels, withListener } from "../traits"

const TreeViewBase = {
    name: "TreeView",
    props: [ "model", "category", "selection", "onSelect", "display", "search", "transition",
        "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener", "async",
        "keyUpListener", "keyDownListener", "unique" ],
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
    created() {
        const _props = {
            get: () => ({
                ...defaults,
                ...object(this.$props).filter(prop => !!prop)
            })
        }
        const _outputs = {
            onSelect:   this.$props.onSelect,
            onDrag:     this.$props.dragndrop && this.$props.dragndrop.drag,
            onOver:     this.$props.dragndrop && this.$props.dragndrop.over,
            onEnter:    this.$props.dragndrop && this.$props.dragndrop.enter,
            onLeave:    this.$props.dragndrop && this.$props.dragndrop.leave,
            onDrop:     this.$props.dragndrop && this.$props.dragndrop.drop,
            onCancel:   this.$props.dragndrop && this.$props.dragndrop.cancel
        }
        const _state = {
            get: () => ({ ...this.$data }),
            set: s => {
                for(const key in s) {
                    if(key in this.$data) this.$data[key] = s[key]
                }
            }
        }
        this.rootNode = new RootNode(
            _props,
            _outputs,
            _state,
            this.$forceUpdate
        )
    },
    mounted() {
        this.keyUpListener.subscribe(this.rootNode.onKey)
        this.keyDownListener.subscribe(this.rootNode.onKey)
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

export const TreeView = combine(
    withLabels(defaults.labels),
    withListener({ eventType: "keyup", prop: "keyUpListener", autoMount: true }),
    withListener({ eventType: "keydown", prop: "keyDownListener", autoMount: true })
)(TreeViewBase)
