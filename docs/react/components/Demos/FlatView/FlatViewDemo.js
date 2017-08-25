// @flow

// Style
import "./FlatViewDemo.css"
// React
import React from "react"
// Bosket
import { FlatView } from "bosket/react"
// (Useful tools)
import { array, string } from "bosket/tools"
// Data model
import model from "self/common/models/FlatViewModel"

export class FlatViewDemo extends React.PureComponent<*, *> {

    // Rendering
    render = () => <FlatView
        { ...this.state }
        selection={ this.props.selection }
        onSelect={ this.props.onSelect }
        limit={ this.props.limit }></FlatView>

    // State
    state = {
        model: model,
        category: "items",
        name: "label",
        search: (input: string) => (i: Object) => !i.items && string(i.label).contains(input),
        display: (item: Object) => !item.items ?
            item.label :
            <div onClick={ ev => this.toggleCategory(item) }>{ item.label }</div>,
        formData: { firstName: "", lastName: "" },
        opened: false
    }

    // Props - provided by the parent component
    props: {
        selection: Object[],
        onSelect: Object[] => void,
        limit?: number
    }

    // Retrives the search input value
    getInput = () => {
        const domElt = document.querySelector(".FlatView input[type='search']")
        return this.state.search &&
            domElt instanceof HTMLInputElement &&
                domElt.value
    }
    // Toggle category selection/deselection
    toggleCategory(item: Object) {
        const input = this.getInput()

        const items = !input ?
            item.items :
            item.items.filter(this.state.search(input))

        if(array(items).allIn(this.props.selection) ||
                this.props.limit &&
                items.length > this.props.limit - this.props.selection.length) {
            this.props.onSelect(array(this.props.selection).notIn(items))
        } else {
            this.props.onSelect([
                ...array(this.props.selection).notIn(items),
                ...items ])
        }
    }
}
