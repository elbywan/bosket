// @flow

// Css
import "./MenuViewDemo.css"
// React
import React from "react"
// Bosket
import { MenuView } from "@bosket/react"
// Data model
import model from "self/common/models/MenuViewModel"

export class MenuViewDemo extends React.PureComponent<*, *> {

    // Rendering
    render = () => <MenuView selection={ this.props.selection } { ...this.state }></MenuView>

    // Passed down state
    state = {
        model: model,
        category: "menu",
        name: "name",
        display: (item: Object) =>
            <span><i className={ "fa " + item.icon }></i><span>{ item.name }</span></span>,
        onSelect: (_: Object[]) => { this.props.updateSelection(_) },
        transition: {
            transitionName: "MenuViewTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        }
    }

    // Flow props type
    props: {
        selection: Object[],
        updateSelection: Object[] => void
    }
}
