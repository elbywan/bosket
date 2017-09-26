<TreeView>
    <div class={ rootNode.mixCss("TreeView") }>
        <input type="search"
            class={ rootNode.mixCss("search") }
            if={ inputs.get().search }
            placeholder={ inputs.get().labels["search.placeholder"] }
            oninput={ onSearch } />
        <TreeViewNode
            opts={ inputs.get() }
            selection={ opts.selection }
            model={ inputs.get().sort ? inputs.get().model.sort(inputs.get().sort) : inputs.get().model }
            filteredmodel={ filtered }
            onselection={ rootNode.onSelect }
            dragndrop={ rootNode.wrapDragNDrop() }
            ancestors={ [] }
            searched={ search.trim() }
            depth={ 0 }>
        </TreeViewNode>
    </div>

    <script type="es6">
        import { tree } from "../../tools"
        import { RootNode, defaults } from "../../core"
        import { optsMixin, listenerMixin } from "../mixins"

        this.mixin(optsMixin())
        this.mixin(listenerMixin({ eventType: "keyup", callback: e => this.rootNode.onKey(e) }))
        this.mixin(listenerMixin({ eventType: "keydown", callback: e => this.rootNode.onKey(e) }))

        // Logic //

        this.filtered = null
        this.search = ""

        this.onSearch = evt => {
            const input = evt.currentTarget.value
            this.search = input
            this.filtered = !input.trim() ? null :
                tree(this.inputs.get().model, this.inputs.get().category)
                    .treeFilter(this.inputs.get().search(input.trim()))
        }

        // Boilerplate //

        this.inputs = {
            get: () => ({
                ...defaults,
                ...this.opts,
                onSelect: this.opts.onselection
            })
        }
        this.outputs = {
            onSelect:   this.inputs.get().onselection,
            onDrag:     this.inputs.get().dragndrop && this.inputs.get().dragndrop.drag,
            onOver:     this.inputs.get().dragndrop && this.inputs.get().dragndrop.over,
            onEnter:    this.inputs.get().dragndrop && this.inputs.get().dragndrop.enter,
            onLeave:    this.inputs.get().dragndrop && this.inputs.get().dragndrop.leave,
            onDrop:     this.inputs.get().dragndrop && this.inputs.get().dragndrop.drop,
            onCancel:   this.inputs.get().dragndrop && this.inputs.get().dragndrop.cancel
        }
        this.state = {
            get: () => ({ ...this }),
            set: s => {
                for(const key in s) {
                    if(key in this) this[key] = s[key]
                }
            }
        }

        this.rootNode = new RootNode(
            this.inputs,
            this.outputs,
            this.state,
            this.update
        )
    </script>
</TreeView>
