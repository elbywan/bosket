import React from "react"

import { ItemTree } from "../RootNode"
import { string, tree, deepMix } from "../../../tools"

export class ExplorerTree extends React.PureComponent {

    conf = {
        css: {
            ItemTree: "ExplorerTree"
        },
        labels: { "search.placeholder": "Search ..." },
        display: item => <a>{ this.props.nameProperty(item) }</a>,
        sort: (a, b) =>
            !a[this.props.category] === !b[this.props.category] ? a[this.props.nameProperty].localeCompare(b[this.props.nameProperty]) :
            a[this.props.category] ? -1 : 1,
        key: item => item[this.props.nameProperty],
        search: input => i => string(i[this.props.nameProperty]).contains(input),
        strategies: {
            selection: ["modifiers"],
            click: ["unfold-on-selection"],
            fold: ["opener-control"]
        },
        dragndrop: {
            draggable: true,
            droppable: true,
            drop: (target, item, event) => {
                let updatedModel = tree(this.props.model, this.props.category).filter(e => this.props.selection.indexOf(e) < 0)
                if(target)
                    target[this.props.category] = [ ...target[this.props.category], ...this.props.selection ]
                else
                    updatedModel = [ ...updatedModel, ...this.props.selection ]
                this.props.updateModel(updatedModel)
            }
        }
    }

    render = () =>
        <ItemTree { ...deepMix(this.conf, this.props, true) }></ItemTree>
}