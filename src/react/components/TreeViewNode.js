// @flow

import React from "react"
import { array } from "../../tools"
import { withTransition } from "../traits"
import { TreeNode } from "../../core"

import type { TreeNodeInput } from "../../core/logic"

type TreeViewNodeProps = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    onSelect:           (item: Object, ancestors: Object[], neighbours: Object[]) => void,
    ancestors:          Object[],
    strategies?:        Object,
    disabled?:          Object => boolean,
    dragndrop?:         Object,
    css?:               { [key: string]: string },
    async?:             (mixed => Promise<Object[]>) => Promise<Object[]>,
    depth?:             number,
    sort?:              (Object, Object) => number,
    key?:               Object => string,
    display?:           (Object, Object[]) => any,
    filteredModel:      null | Map<Object, *>,
    folded:             boolean,
    loading?:           boolean,
    noOpener?:          boolean,
    opener?:            Class<React.Component<*, *, *>>,
    searched:           boolean
}

type TreeViewNodeState = { unfolded: Object[] }

/* Node component */
class TreeViewNodeBaseClass extends React.PureComponent<*, TreeViewNodeProps, TreeViewNodeState> {

    /* Lifecycle & data */
    node: TreeNode
    _unmounted: boolean

    state : TreeViewNodeState = {
        unfolded: []
    }
    _state = {
        get: () => this.state,
        set: (s: Object) => this.setState(s)
    }
    _props = {
        get: () => this.props
    }

    constructor(props: TreeViewNodeProps & TreeNodeInput) {
        super(props)
        this.node = new TreeNode(
            this._props,
            {},
            this._state,
            () => { if(!this._unmounted) this.forceUpdate() }
        )
    }

    componentWillUnmount() {
        this._unmounted = true
    }

    /* Rendering */

    renderSubtree = (item: Object) => {
        if(!this.node.hasChildren(item) && !this.node.isAsync(item))
            return null

        let childModel = item[this.props.category]
        let filteredModel = null

        /* If data has to be retrieved asynchronously */
        if(this.node.isAsync(item) && !this.node.isFolded(item) && !array(this.node.pending).contains(item)) {
            this.node.unwrapPromise(item)
        }
        if(!this.node.isAsync(item)) {
            childModel = this.props.sort ? childModel.sort(this.props.sort) : childModel
        }
        if(this.props.filteredModel) {
            filteredModel = this.props.filteredModel.get(item)
        }

        return  (
            <TreeViewNode
                { ...(this.props: TreeViewNodeProps) }
                model={ childModel }
                filteredModel={ filteredModel }
                ancestors={ [ ...this.props.ancestors, item ] }
                depth={ (this.props.depth || 0) + 1 }
                folded={ this.node.isFolded(item) }
                loading={ this.node.isAsync(item) && !this.node.isFolded(item) }>
            </TreeViewNode>
        )
    }

    renderOpener = (item: Object, OpenerComponent: Class<React.Component<*, *, *>> | string) =>
        (this.node.hasChildren(item) || this.node.isAsync(item)) && !this.props.noOpener ?
            <OpenerComponent className={ this.node.mixCss("opener") } onClick={ this.node.onOpener(item) }></OpenerComponent> :
            null

    render() {
        const { model, folded, display, key, loading } = this.props

        if(folded)
            return null

        /* If data has to be retrieved asynchronously */
        if(loading) {
            return <span></span>
        }

        const OpenerComponent = this.props.opener || "span"
        const list = model
                .filter(m => !this.props.searched || this.props.filteredModel && this.props.filteredModel.has(m))
                .map((item, idx) =>
                    <li key={ key && key(item) || idx }
                        className={ this.node.liCss(item) }
                        onClick={ this.node.onClick(item) }
                        { ...this.node.getDragEvents(item) }>
                        <span className={ this.node.mixCss("item") }>
                            { display && display(item, this.props.ancestors) }
                            { this.renderOpener(item, OpenerComponent) }
                        </span>
                        { this.renderSubtree(item) }
                    </li>
                )

        return (
            <ul className={ this.node.ulCss() }
                { ...this.node.getDragEvents(null, this.props.dragndrop && this.props.dragndrop.draggable && !this.props.depth) }>
                { list }
            </ul>
        )
    }
}
export const TreeViewNode = withTransition({ key: props => props.folded || props.loading })(TreeViewNodeBaseClass)
