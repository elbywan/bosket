import React from "react"

import { TreeView } from "../RootNode"
import { deepMix } from "../../../tools"

export class MenuView extends React.PureComponent {

    conf = {
        css: {
            TreeView: "MenuView"
        },
        strategies: {
            selection: ["ancestors"],
            click: ["unfold-on-selection"],
            fold: [ "not-selected", "no-child-selection" ]
        },
        noOpener: true,
        dragndrop: {
            draggable: false,
            droppable: false
        },
        display: item => item[this.props.name],
        key: item => item[this.props.name]
    }

    render = () =>
        <TreeView { ...deepMix(this.conf, this.props, true) }></TreeView>
}