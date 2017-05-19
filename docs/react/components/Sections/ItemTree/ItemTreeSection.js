import "./ItemTreeSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"

import { ItemTree } from "../../../../../src/react"
import { string, tree } from "../../../../../src/tools"

const timeoutPromise = (value, duration) => new Promise(resolve => setTimeout(() => resolve(value), duration))

export class ItemTreeSection extends React.PureComponent {

    state = {
        model: [
            {
                label: "Vegetables",
                items: [
                    { label: "Potato" },
                    { label: "Carrot" },
                    { label: "Tomato" }
                ]
            },
            {
                label: "Fruits",
                items: [
                    { label: "Orange" },
                    { label: "Watermelon" },
                    { label: "Banana" },
                    { label: "Kumquat" },
                    { label: "Strawberry" },
                    { label: "Raspberry" },
                    { label: "Cherry" }
                ]
            },
            {
                label: "Animals",
                items: [
                    {
                        label: "Mammals",
                        items: [
                            { label: "Tiger" },
                            { label: "Platypus" },
                            { label: "Bear" }
                        ]
                    },
                    {
                        label: "Reptiles",
                        items: [
                            { label: "Turtle" },
                            { label: "Crocodile" }
                        ]
                    },
                    {
                        label: "Insects",
                        items: [
                            { label: "Bee" },
                            { label: "Fly" },
                            { label: "Ant" }
                        ]
                    }
                ]
            },
            {
                label: "Durations",
                items: () => timeoutPromise([
                    { label: "0.5 second",  items: () => timeoutPromise([{ label: "Brief" }], 500) },
                    { label: "2 seconds",   items: () => timeoutPromise([{ label: "Enduring" }], 2000) },
                    { label: "4 seconds",   items: () => timeoutPromise([{ label: "Everlasting" }], 4000) }
                ], 1000)
            }
        ],
        category: "items",
        display: item => <a>{ item.label }</a>,
        sort: (a, b) => a.label.localeCompare(b.label),
        key: item => item.label,
        search: input => i => string(i.label).contains(input),
        // disabled: item => item.items,
        selection: [],
        onSelect: function(items) { this.setState({ selection: items }) }.bind(this),
        transition: {
            transitionName: "ItemTreeTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        },
        strategies: {
            selection: ["modifiers"],
            click: ["unfold-on-selection"],
            fold: ["opener-control"]
        },
        /*
        selectionStrategy: ["single"],
        clickStrategy: ["unfold-on-selection"],
        foldStrategy: [ "no-child-selection", "not-selected" ],
        */
        noOpener: false,
        dragndrop: {
            draggable: true,
            droppable: true,
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
                description="Powerful tree of nested objects.">

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