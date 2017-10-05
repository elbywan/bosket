// @flow

import React from "react"
import { deepMix } from "@bosket/tools"

import { TreeView } from "../TreeView"
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
        openerOpts: { position: "none" },
        display: (item: Object) => item[this.props.name],
        key: (item: Object) => item[this.props.name]
    }

    render = () =>
        <TreeView { ...(deepMix(this.conf, this.props, true)) }></TreeView>
}
