// @flow

import React from "react"

import { TreeView } from "../TreeView"
import { deepMix } from "../../../tools"

import type { TreeViewProps } from "../TreeView"

type MenuViewProps = {
    name: string
} & TreeViewProps

export class MenuView extends React.PureComponent<MenuViewProps> {

    conf : Object = {
        css: {
            TreeView: "MenuView"
        },
        strategies: {
            selection: ["ancestors"],
            click: ["unfold-on-selection"],
            fold: [ "not-selected", "no-child-selection" ]
        },
        noOpener: true,
        display: (item: Object) => item[this.props.name],
        key: (item: Object) => item[this.props.name]
    }

    render = () =>
        <TreeView { ...(deepMix(this.conf, this.props, true)) }></TreeView>
}
