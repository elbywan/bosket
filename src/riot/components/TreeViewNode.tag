<TreeViewNode>
    <ul if={ !opts.folded && !opts.loading }
        data-is="with-transition"
        transition={ opts.transition }
        class={ node.ulCss() }
        ondragover={    !opts.depth ? rootEvents.onDragOver : null}
        ondragenter={   !opts.depth ? rootEvents.onDragEnter : null }
        ondragleave={   !opts.depth ? rootEvents.onDragLeave : null }
        ondrop={        !opts.depth ? rootEvents.onDrop : null }>

        <li each={ item in getModel() }
            class={ node.liCss(item) }
            draggable={     node.getDragEvents(item).draggable }
            ondragstart={   node.getDragEvents(item).onDragStart }
            ondragover={    node.getDragEvents(item).onDragOver }
            ondragenter={   node.getDragEvents(item).onDragEnter }
            ondragleave={   node.getDragEvents(item).onDragLeave }
            ondragend={     node.getDragEvents(item).onDragEnd }
            ondrop={        node.getDragEvents(item).onDrop }>
            <span class={ parent.node.mixCss("item") } onclick={ parent.node.onClick(item) }>
                <virtual if={ !parent.opts.displaytag }>
                    { parent.opts.display(item, parent.opts) }
                </virtual>
                <virtual if={ parent.opts.displaytag } data-is={ parent.opts.displaytag(item, parent.opts) } item={ item } inputs={ inputs.get() }></virtual>
                <span if={ node.hasChildren(item) || node.isAsync(item) && !parent.opts.noopener }
                    class={ node.mixCss("opener") }
                    onclick={ node.onOpener(item) }></span>
            </span>
            <TreeViewNode
                if={ node.hasChildren(item) || node.isAsync(item) }
                opts={ parent.opts }
                selection={ parent.opts.selection }
                model={ getChildModel(item) }
                filteredmodel={ getChildFiltered(item) }
                ancestors={ getAncestors(item) }
                depth={ parent.opts.depth + 1 }
                folded={ node.isFolded(item) }
                loading={ node.isAsync(item) && !node.isFolded(item) }>
            </TreeViewNode>
        </li>
    </ul>
    <span if={ opts.loading }></span>

    <script type="es6">
        import { TreeNode } from "@bosket/core"
        import { optsMixin } from "../mixins"

        this.mixin(optsMixin())

        // Logic //

        this.unfolded = []

        this.getModel = () =>
            this.opts.searched ?
                this.opts.model.filter(m => this.opts.filteredmodel.has(m)) :
                this.opts.model

        this.getChildModel = item => {
            let childModel = item[this.opts.category]

            /* If data has to be retrieved asynchronously */
            if(this.node.isAsync(item) && !this.node.isFolded(item) && this.node.pending.indexOf(item) < 0) {
                this.node.unwrapPromise(item)
            }
            if(!this.node.isAsync(item)) {
                childModel = this.opts.sort ? childModel.sort(this.opts.sort) : childModel
            }

            return childModel
        }

        this.getChildFiltered = item =>
            this.opts.searched ?
                this.opts.filteredmodel.get(item) :
                null

        this.getAncestors = item =>
            [ ...this.opts.ancestors, item ]

        // Boilerplate //

        const mock = () => {
            this.opts.onSelect = this.opts.onselection
            this.opts.disabled = this.opts.disable
        }
        this.on("update", mock)
        mock()

        this.inputs = { get: () => this.opts }
        this.state = {
            get: () => this,
            set: s => {
                for(const key in s) {
                    if(key in this) this[key] = s[key]
                }
            }
        }
        this.node = new TreeNode(this.inputs, null, this.state, this.update)
        this.rootEvents = this.node.getDragEvents()

    </script>

</TreeViewNode>
