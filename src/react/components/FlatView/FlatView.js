// @flow

import React from "react"

import { TreeView } from "../TreeView"
import { array, deepMix } from "../../../tools"

import type { TreeViewProps } from "../TreeView"

type FlatViewProps = {
    name: string,
    limit?: number
} & TreeViewProps

export class FlatView extends React.PureComponent<FlatViewProps> {

    conf : Object = {
        css: {
            TreeView: "FlatView"
        },
        strategies: {
            selection: ["multiple"],
            click: [],
            fold: [(item: Object) => false]
        },
        disabled: (item: Object) =>
            !array(this.props.selection).contains(item) &&
            this.props.limit && this.props.selection.length >= this.props.limit ||
            item[this.props.category],
        display: (item: Object) => item[this.props.name],
        key: (item: Object) => item[this.props.name],
        noOpener: true
    }

    render = () => <TreeView { ...deepMix(this.conf, this.props, true) }></TreeView>
}
