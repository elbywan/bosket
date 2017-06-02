import "./TreeViewSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"

/* Bosket imports */
import { TreeView } from "bosket/react"
import { string } from "bosket/tools"
import { dragndrop } from "bosket/core/dragndrop"

/* Model */
import model from "../../../../common/models/TreeViewModel"

export class TreeViewSection extends React.PureComponent {

    constructor(props) {
        super(props)
        // Load the drag image once on component creation.
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.svg"
    }

    // The state is passed down to the TreeView
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
            transitionName: "TreeViewDemoTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        },
        css: { TreeView: "TreeViewDemo" },
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
            drop: (target, item, event) => {
                this.setState({
                    model: dragndrop.drops.selection(
                        target,
                        this.state.model,
                        this.state.category,
                        this.state.selection)
                })
            }
        }
    }

    // We render the TreeView with the state as props
    renderTreeView = () =>
        <div style={ { display: "inline-block" } }>
            <TreeView { ...this.state }></TreeView>
        </div>

    // The rest of the demo (demo window / selection boxes) ...
    render = () =>
        <ComponentSection
                componentName="TreeView Demo"
                description={
                    <div>
                        <p>
                            <em>Typical use of the TreeView component</em>&nbsp;
                            which shows how to override and use most of its&nbsp;
                            <em><a href="#Components#TreeView#Required props">component props</a></em>, and &nbsp;
                            <em><a href="#Components#TreeView#Css">css styles</a></em>.
                        </p>
                        <span>Featuring :</span>
                        <ul>
                            <li>- Drag and drop, with a custom drag image.</li>
                            <li>- Asynchronous children</li>
                            <li>- Keyboard modifiers (shift / ctrl or cmd)</li>
                            <li>- Transitions</li>
                            <li>- Sort & search</li>
                        </ul>
                    </div>
                }
                files={[
                    "./components/Sections/TreeView/TreeViewSection.js",
                    "./components/Sections/TreeView/TreeViewSection.css",
                    "../common/models/TreeViewModel.js"
                ]}>

            { /* The TreeView is rendered here */ }
            { this.renderTreeView() }

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