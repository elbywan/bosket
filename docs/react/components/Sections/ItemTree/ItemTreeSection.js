import "./ItemTreeSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"

import { ItemTree } from "../../../../../src/react"
import { string, tree } from "../../../../../src/tools"
import model from "../../../../common/models/ItemTreeModel"

export class ItemTreeSection extends React.PureComponent {

    constructor(props) {
        super(props)
        this.dragImage = new Image()
        this.dragImage.src = "./assets/drag-image.svg"
    }

    state = {
        model: model,
        category: "items",
        display: item => <a>{ item.label }</a>,
        sort: (a, b) => a.label.localeCompare(b.label),
        key: item => item.label,
        search: input => i => string(i.label).contains(input),
        selection: [],
        onSelect: function(items) { this.setState({ selection: items }) }.bind(this),
        transition: {
            transitionName: "ItemTreeTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        },
        strategies: {
            selection: ["modifiers"],
            click: [],
            fold: ["opener-control"]
        },
        noOpener: false,
        dragndrop: {
            draggable: true,
            droppable: true,
            drag: (target, event, ancestors, neighbours) => {
                event.dataTransfer.setDragImage(this.dragImage, 0, 0)
            },
            drop: (target, item) => {
                let updatedModel = tree(this.state.model, this.state.category).filter(e => this.state.selection.indexOf(e) < 0)
                if(target)
                    target[this.state.category] = [ ...target[this.state.category], ...this.state.selection ]
                else
                    updatedModel = [ ...updatedModel, ...this.state.selection ]

                this.setState({ model: updatedModel })
            }
        }
    }

    render = () =>
        <ComponentSection
                componentName="ItemTree"
                description="Powerful tree of nested objects."
                files={[
                    "./react/components/Sections/ItemTree/ItemTreeSection.js",
                    "./react/components/Sections/ItemTree/ItemTreeSection.css"
                ]}>

            <div className="inline-row">
                <ItemTree { ...this.state }></ItemTree>
            </div>

             <p>
                {
                    this.state.selection.length === 0 ? "No elements are" :
                    this.state.selection.length === 1 ? "One element is" :
                    this.state.selection.length  + " elements are"
                } selected.
            </p>
            <div className="select-blocks">
                { this.state.selection.map((item, idx) =>
                    <button key={ idx } onClick={ event => this.setState({ selection: this.state.selection.filter(i => i !== item) }) }>
                        { item.label }
                    </button>
                ) }
            </div>

        </ComponentSection>

}