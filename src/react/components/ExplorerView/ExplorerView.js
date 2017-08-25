// @flow

import React from "react"

import { TreeView } from "../TreeView"
import { string, deepMix } from "../../../tools"
import { dragndrop } from "../../../core"

import type { TreeViewProps } from "../TreeView"

type ExplorerViewProps = {
    updateModel: Object[] => void,
    name: string
} & TreeViewProps

export class ExplorerView extends React.PureComponent<ExplorerViewProps> {

    conf : Object = {
        css: {
            TreeView: "ExplorerView"
        },
        display: (item: Object) => <a>{ item[this.props.name] }</a>,
        sort: (a: Object, b: Object) =>
            !a[this.props.category] === !b[this.props.category] ? a[this.props.name].localeCompare(b[this.props.name]) :
                a[this.props.category] ? -1 : 1,
        key: (item: Object) => item[this.props.name],
        search: (input: string) => (i: Object) => string(i[this.props.name]).contains(input),
        strategies: {
            selection: ["modifiers"],
            click: ["unfold-on-selection"],
            fold: ["opener-control"]
        },
        dragndrop: {
            ...dragndrop.selection(() => this.props.model, this.props.updateModel),
            droppable: _ => !_ || _[this.props.category]
        }
    }

    render = () =>
        <TreeView { ...(deepMix(this.conf, this.props, true)) }></TreeView>
}
