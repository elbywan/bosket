import React from "react"
import { array, object, withTransition } from "../../tools"
import { Node } from "../../core"

/* Node component */
class ItemTreeNodeBaseClass extends React.PureComponent {

    /* Lifecycle & data */

    state = {
        unfolded: []
    }
    _state = {
        get: () => this.state,
        set:  s => this.setState(s)
    }
    _props = {
        get: () => this.props
    }

    constructor(props) {
        super(props)
        this.node = new Node(
            this._props,
            null,
            this._state,
            () => { if(!this._unmounted) this.forceUpdate() }
        )
    }

    componentWillUnmount() {
        this._unmounted = true
    }

    /* Rendering */

    renderSubtree = item => {
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
            filteredModel = this.props.filteredModel.find(m => object(item).shallowCompare(m, [this.props.category]))[this.props.category]
        }

        return  (
            <ItemTreeNode
                { ...this.props }
                model={ childModel }
                filteredModel={ filteredModel }
                ancestors={ [ ...this.props.ancestors, item ] }
                depth={ (this.props.depth || 0) + 1 }
                folded={ this.node.isFolded(item) }
                loading={ this.node.isAsync(item) && !this.node.isFolded(item) }>
            </ItemTreeNode>
        )
    }

    renderOpener = (item, OpenerComponent) =>
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
                .filter(m => !this.props.searched || this.props.filteredModel.find(f => object(m).shallowCompare(f, [this.props.category])))
                .map((item, idx) =>
                    <li key={ key && key(item) || idx }
                        className={ this.node.liCss(item) }
                        onClick={ this.node.onClick(item) }
                        { ...this.node.getDragEvents(item) }>
                        <span className={ this.node.mixCss("item") }>
                            { display(item) }
                            { this.renderOpener(item, OpenerComponent) }
                        </span>
                        { this.renderSubtree(item) }
                    </li>
                )

        return (
            <ul className={ this.node.ulCss() }
                    { ...this.node.getDragEvents(null, this.props.dragndrop.draggable && !this.props.depth) }>
                { list }
            </ul>
        )
    }
}
export const ItemTreeNode = withTransition({ key: props => props.folded || props.loading })(ItemTreeNodeBaseClass)