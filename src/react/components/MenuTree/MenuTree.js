import React from "react"

import { ItemTree } from "../RootNode"
import { deepMix } from "../../../tools"

export class MenuTree extends React.PureComponent {

    conf = {
        css: {
            ItemTree: "MenuTree"
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
        <ItemTree { ...deepMix(this.conf, this.props, true) }></ItemTree>
}