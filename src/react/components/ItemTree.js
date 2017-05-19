import React from "react"
import { array, tree, object, withTransition, withLabels, withListener } from "../../tools"
import { Node, RootNode, defaults } from "../../core"

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
            <OpenerComponent className="ItemTree-opener" onClick={ this.node.onOpener(item) }></OpenerComponent> :
            null

    render() {
        const { model, folded, display, key, loading } = this.props

        if(folded)
            return null

        /* If data has to be retrieved asynchronously */
        if(loading) {
            return <span className="ItemTree-async-loading"></span>
        }

        const OpenerComponent = this.props.opener || "span"
        const list = model
                .filter(m => !this.props.searched || this.props.filteredModel.find(f => object(m).shallowCompare(f, [this.props.category])))
                .map((item, idx) =>
                    <li key={ key && key(item) || idx }
                        className={ this.node.liCss(item) }
                        onClick={ this.node.onClick(item) }
                        { ...this.node.getDragEvents(item) }>
                        <span className="ItemTree-item">
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
const ItemTreeNode = withTransition({ key: props => props.folded || props.loading })(ItemTreeNodeBaseClass)

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
                onStart:    this.props.dragndrop.start || (() => {}),
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
        const { sort, css, async, strategies, ...rest } = this._props.get()

        const searchBar = !this.props.search ? null :
                <input type="search" className="ItemTree-search"
                    value={ this.state.search }
                    placeholder={ this.props.labels["search.placeholder"] }
                    onChange={ this.onSearch } />

        return (
            <div className="ItemTree">
                { searchBar }
                <ItemTreeNode
                    { ...rest }
                    model={ sort ? this.props.model.sort(sort) : this.props.model }
                    filteredModel={ this.state.filtered }
                    onSelect={ this.rootNode.onSelect }
                    strategies={ strategies }
                    css={ css }
                    async={ async }
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

