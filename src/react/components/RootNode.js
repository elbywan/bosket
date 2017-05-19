import React from "react"
import { tree, withListener, withLabels } from "../../tools"
import { RootNode, defaults } from "../../core"
import { ItemTreeNode } from "./Node"

/* Root component */

class ItemTreeBaseClass extends React.PureComponent {

    /* Data & lifecycle */

    state = {
        search: "",
        filtered: null
    }
    _state = {
        get: () => this.state,
        set:  s => this.setState(s)
    }
    _props = {
        get: () => Object.assign({}, { ...defaults }, this.props)
    }

    constructor(props) {
        super(props)
        this.rootNode = new RootNode(
            this._props,
            {
                onSelect:   this.props.onSelect,
                onDrag:     this.props.dragndrop.drag || (() => {}),
                onDrop:     this.props.dragndrop.drop
            },
            this._state,
            () => { if(!this._unmounted) this.forceUpdate() }
        )
        if(props.keyDownListener) props.keyDownListener.subscribe(this.rootNode.onKey)
        if(props.keyUpListener) props.keyUpListener.subscribe(this.rootNode.onKey)
    }

    /* Events */

    onSearch = evt => {
        const input = evt.target.value
        this.setState({
            search: input,
            filtered: !input.trim() ?
                null :
                tree(this.props.model, this.props.category)
                    .treeFilter(this.props.search(input.trim()))
        })
    }

    /* Rendering */

    render() {
        const { sort, ...rest } = this._props.get()

        const searchBar = !this.props.search ? null :
                <input type="search" className={ this.rootNode.mixCss("search") }
                    value={ this.state.search }
                    placeholder={ this.props.labels["search.placeholder"] }
                    onChange={ this.onSearch } />

        return (
            <div className={ this.rootNode.mixCss("ItemTree") }>
                { searchBar }
                <ItemTreeNode
                    { ...rest }
                    model={ sort ? this.props.model.sort(sort) : this.props.model }
                    filteredModel={ this.state.filtered }
                    onSelect={ this.rootNode.onSelect }
                    dragndrop={ this.rootNode.wrapDragNDrop() }
                    ancestors={ [] }
                    sort={ sort }
                    searched={ this.state.search.trim() }>
                </ItemTreeNode>
            </div>
        )
    }
}
export const ItemTree = [
    withLabels(defaults.labels),
    withListener({ eventType: "keydown", propName: "keyDownListener", autoMount: true }),
    withListener({ eventType: "keyup", propName: "keyUpListener", autoMount: true })
].reduce((accu, trait) => trait(accu), ItemTreeBaseClass)

