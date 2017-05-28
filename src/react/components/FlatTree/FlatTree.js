import React from "react"

import { ItemTree } from "../RootNode"
import { array, deepMix } from "../../../tools"

export class FlatTree extends React.PureComponent {

    conf = {
        css: {
            ItemTree: "FlatTree"
        },
        strategies: {
            selection: ["multiple"],
            click: [],
            fold: [item => false]
        },
        disabled: item =>
            !array(this.props.selection).contains(item) &&
            this.props.limit && this.props.selection.length >= this.props.limit ||
            item[this.props.category],
        display: item => item[this.props.name],
        key: item => item[this.props.name],
        noOpener: true,
        dragndrop: {
            draggable: false,
            droppable: false
        }
    }

    render = () =>
        <ItemTree { ...deepMix(this.conf, this.props, true) }></ItemTree>
}