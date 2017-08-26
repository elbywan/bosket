import { array, object } from "../../tools"
import { withTransition } from "../traits"
import { TreeNode } from "../../core"

const TreeViewNodeBase = {
    name: "TreeViewNode",
    created() {
        const _inputs = { get: () => this.$props }
        const _state = {
            get: () => this.$data,
            set: s => {
                for(const key in s) {
                    if(key in this.$data) this.$data[key] = s[key]
                }
            }
        }
        this.node = new TreeNode(
            _inputs,
            {},
            _state,
            () => { if(!this._unmounted) this.$forceUpdate() }
        )
    },
    beforeDestroy() {
        this._unmounted = true
    },
    props: [ "model", "category", "selection", "onSelect", "display", "strategies", "dragndrop",
        "labels", "sort", "disabled", "noOpener", "async", "css", "folded", "transition",
        "unique", "loading", "depth", "ancestors", "searched", "onSelect", "filteredModel" ],
    data: () => ({
        unfolded: []
    }),
    computed: {
        childrenModel() {
            const map = new Map()
            this.$props.model.forEach(item => {
                if(this.node.hasChildren(item) && !this.node.isAsync(item))
                    map.set(item, this.$props.sort ?
                        item[this.$props.category].sort(this.$props.sort) :
                        item[this.$props.category])
            })
            return map
        },
        rootDragData() {
            const rootData = this.node.getDragEvents(null, !this.$props.depth)
            return {
                attrs: { draggable: rootData.draggable },
                ...object(rootData).nestPrefix("on", _ => _.toLowerCase())
            }
        }
    },
    render() {
        const renderSubtree = item => {
            if(!this.node.hasChildren(item) && !this.node.isAsync(item))
                return null

            let filteredModel = null

            /* If data has to be retrieved asynchronously */
            if(this.node.isAsync(item) && !this.node.isFolded(item) && !array(this.node.pending).contains(item)) {
                this.node.unwrapPromise(item)
            }
            if(this.$props.filteredModel) {
                filteredModel = this.$props.filteredModel.get(item)
            }

            const data = {
                props: {
                    ...this.$props,
                    model: this.childrenModel.get(item),
                    filteredModel: filteredModel,
                    ancestors: [ ...this.$props.ancestors, item ],
                    depth: (this.$props.depth || 0) + 1,
                    folded: this.node.isFolded(item),
                    loading: this.node.isAsync(item) && !this.node.isFolded(item)
                }
            }

            return  (
                <TreeViewNode { ...data }></TreeViewNode>
            )
        }

        const renderOpener = (item, OpenerComponent) =>
            (this.node.hasChildren(item) || this.node.isAsync(item)) && !this.$props.noOpener ?
                <OpenerComponent class={ this.node.mixCss("opener") } onClick={ this.node.onOpener(item) }></OpenerComponent> :
                null

        const { model, folded, display, loading } = this.$props

        if(folded)
            return null

        /* If data has to be retrieved asynchronously */
        if(loading) {
            return <span></span>
        }

        const OpenerComponent = this.$props.opener || "span"
        const list = model
            .filter(m => !this.$props.searched || this.$props.filteredModel && this.$props.filteredModel.has(m))
            .map((item, idx) => {
                const rawLiData = {
                    ...this.node.getDragEvents(item),
                    "class": this.node.liCss(item)
                }
                const liData = {
                    attrs: { draggable: rawLiData.draggable },
                    ...object(rawLiData).nestPrefix("on", _ => _.toLowerCase())
                }
                if(this.$props.unique)
                    liData.key = this.$props.unique(item, idx)
                return <li { ...liData }>
                    <span class={ this.node.mixCss("item") } onClick={ this.node.onClick(item) }>
                        { display && display(item, this.$props) }
                        { renderOpener(item, OpenerComponent) }
                    </span>
                    { renderSubtree(item) }
                </li>
            })

        return (
            <ul class={ this.node.ulCss() } { ...this.rootDragData }>
                { list }
            </ul>
        )
    }
}

export const TreeViewNode = withTransition({ key: props => props.folded || props.loading })(TreeViewNodeBase)
