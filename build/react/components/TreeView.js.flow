// @flow

import React from "react"
import { withLabels, combine, withListener } from "../traits"
import { tree } from "../../tools/trees"
import { RootNode, defaults } from "../../core"
import { TreeViewNode } from "./TreeViewNode"

import type { RootNodeInput } from "../../core/logic"

export type TreeViewProps = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    onSelect:           (newSelection: Object[], item: Object, ancestors: Object[], neighbours: Object[]) => void,
    display?:           (Object, Object[]) => any,
    key?:               Object => string,
    strategies?:        Object,
    sort?:              (Object, Object) => number,
    disabled?:          Object => boolean,
    search?:            string => Object => boolean,
    async?:             (mixed => Promise<Object[]>) => Promise<Object[]>,
    dragndrop?:         Object,
    noOpener?:          boolean,
    labels?:            Object,
    css?:               { [key: string]: string },
    transition?:        Object,
    keyDownListener?:   Object,
    keyUpListener?:     Object
}
type TreeViewState = {
    search: string,
    filtered: null | Map<Object, *>
}

class TreeViewBaseClass extends React.PureComponent<void, TreeViewProps, TreeViewState> {

    /* Data & lifecycle */
    rootNode: RootNode

    state : TreeViewState = {
        search: "",
        filtered: null
    }
    _state = {
        get: () => this.state,
        set: (s: Object) => this.setState(s)
    }
    _props = {
        get: () : RootNodeInput => ({ ...defaults, ...this.props })
    }

    constructor(props: TreeViewProps) {
        super(props)
        this.rootNode = new RootNode(
            this._props,
            {
                onSelect:   this.props.onSelect,
                onDrag:     this.props.dragndrop && this.props.dragndrop.drag,
                onDrop:     this.props.dragndrop && this.props.dragndrop.drop,
                onCancel:   this.props.dragndrop && this.props.dragndrop.cancel
            },
            this._state,
            this.forceUpdate
        )
        if(props.keyDownListener) props.keyDownListener.subscribe(this.rootNode.onKey)
        if(props.keyUpListener) props.keyUpListener.subscribe(this.rootNode.onKey)
    }

    /* Events */

    onSearch = (evt: Event & { currentTarget: HTMLButtonElement }) => {
        const input = evt.currentTarget.value
        this.setState({
            search: input,
            filtered: !input.trim() ?
                null :
                tree(this.props.model, this.props.category)
                    /* eslint-disable */
                    .treeFilter((this.props.search: any)(input.trim()))
                    /* eslint-enable */
        })
    }

    /* Rendering */

    render() {
        const sort = this.props.sort
        const { onSelect, ...rest } = this.props
        const props : any = { ...defaults, ...rest }

        const searchBar = !this.props.search ? null :
            <input type="search" className={ this.rootNode.mixCss("search") }
                value={ this.state.search }
                placeholder={ this.props.labels && this.props.labels["search.placeholder"] }
                onChange={ this.onSearch } />

        return (
            <div className={ this.rootNode.mixCss("TreeView") }>
                { searchBar }
                <TreeViewNode
                    { ...props }
                    model={ sort ? this.props.model.sort(sort) : this.props.model }
                    filteredModel={ this.state.filtered }
                    onSelect={ this.rootNode.onSelect }
                    dragndrop={ this.rootNode.wrapDragNDrop() }
                    ancestors={ [] }
                    sort={ sort }
                    folded={ false }
                    searched={ !!this.state.search.trim() }>
                </TreeViewNode>
            </div>
        )
    }
}


export const TreeView = combine(
    withLabels(defaults.labels),
    withListener({ eventType: "keydown", propName: "keyDownListener", autoMount: true }),
    withListener({ eventType: "keyup", propName: "keyUpListener", autoMount: true })
)(TreeViewBaseClass)
