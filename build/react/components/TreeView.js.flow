// @flow

import React from "react"
import { withLabels, combine, withListener } from "../traits"
import { tree } from "../../tools/trees"
import { RootNode, defaults } from "../../core"
import { TreeViewNode } from "./TreeViewNode"

import type { Key } from "react"
import type { RootNodeInput } from "../../core/logic"

export type TreeViewProps = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    onSelect:           (newSelection: Object[], item: Object, ancestors: Object[], neighbours: Object[]) => void,
    display?:           (item: Object, inputs: Object) => any,
    unique?:            Object => Key,
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

class TreeViewBaseClass extends React.PureComponent<TreeViewProps, TreeViewState> {

    /* Data & lifecycle */
    rootNode: RootNode
    defaultsMix: Object
    wrappedDragNDrop: Object
    ancestors = []

    state : TreeViewState = {
        search: "",
        filtered: null
    }

    constructor(props: TreeViewProps) {
        super(props)

        const _props = {
            get: () : RootNodeInput => ({ ...defaults, ...this.props })
        }
        const _outputs = {
            onSelect:   this.props.onSelect,
            onDrag:     this.props.dragndrop && this.props.dragndrop.drag,
            onOver:     this.props.dragndrop && this.props.dragndrop.over,
            onEnter:    this.props.dragndrop && this.props.dragndrop.enter,
            onLeave:    this.props.dragndrop && this.props.dragndrop.leave,
            onDrop:     this.props.dragndrop && this.props.dragndrop.drop,
            onCancel:   this.props.dragndrop && this.props.dragndrop.cancel
        }
        const _state = {
            get: () => this.state,
            set: (s: Object) => this.setState(s)
        }

        this.rootNode = new RootNode(
            _props,
            _outputs,
            _state,
            this.forceUpdate
        )

        if(props.keyDownListener) props.keyDownListener.subscribe(this.rootNode.onKey)
        if(props.keyUpListener) props.keyUpListener.subscribe(this.rootNode.onKey)
        this.wrappedDragNDrop = this.rootNode.wrapDragNDrop()
    }

    /* Events */

    onSearch = (evt: Event & { currentTarget: HTMLButtonElement }) => {
        if(evt.currentTarget instanceof HTMLInputElement) {
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
    }

    /* Rendering */

    componentWillReceiveProps(nextProps) {
        let update = false
        for(const key in defaults) {
            if(nextProps[key] !== this.props[key]) {
                update = true
                break
            }
        }
        if(update)
            this.defaultsMix = { ...defaults, ...nextProps }
    }

    render() {
        const sort = this.props.sort
        const props : any = this.defaultsMix || { ...defaults, ...this.props }

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
                    dragndrop={ this.wrappedDragNDrop }
                    ancestors={ this.ancestors }
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
    withListener({ eventType: "keyup", propName: "keyUpListener", autoMount: true }),
    withListener({ eventType: "keydown", propName: "keyDownListener", autoMount: true })
)(TreeViewBaseClass)
