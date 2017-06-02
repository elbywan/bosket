import React from "react"

import { TreeView } from "../RootNode"
import { string, tree, deepMix } from "../../../tools"

export class ExplorerView extends React.PureComponent {

    conf = {
        css: {
            TreeView: "ExplorerView"
        },
        display: item => <a>{ this.props.name(item) }</a>,
        sort: (a, b) =>
            !a[this.props.category] === !b[this.props.category] ? a[this.props.name].localeCompare(b[this.props.name]) :
            a[this.props.category] ? -1 : 1,
        key: item => item[this.props.name],
        search: input => i => string(i[this.props.name]).contains(input),
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
        <TreeView { ...deepMix(this.conf, this.props, true) }></TreeView>
}