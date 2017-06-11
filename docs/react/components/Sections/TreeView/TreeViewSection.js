// @flow

import "./TreeViewSection.css"

import React from "react"

import { ComponentSection } from "self/react/components/ComponentSection/ComponentSection"
import { TreeViewDemo } from "./TreeViewDemo"

export class TreeViewSection extends React.PureComponent {

    state = {
        selection: []
    }

    // We render the TreeView into the window
    renderTreeView = () =>
        <div style={ { display: "inline-block" } }>
            <TreeViewDemo selection={ this.state.selection } update={ _ => this.setState({ selection: _ }) }></TreeViewDemo>
        </div>

    // The rest of the demo (window / selection boxes) ...
    render = () =>
        <ComponentSection
                componentName="Nested lists"
                description={
                    <div>
                        <p>
                            <span>Demonstrates a basic usage of the TreeView component </span>
                            <span>and how to override and use most of its </span>
                            <em><a href="#TreeView#Required props">component props</a></em>, and&nbsp;
                            <em><a href="#TreeView#Css">css styles</a></em>.
                        </p>
                        <span>Featuring :</span>
                        <ul>
                            <li>- Drag and drop, with a custom drag image.</li>
                            <li>- Asynchronous children loading</li>
                            <li>- Multiselection using keyboard modifiers (shift / ctrl or cmd)</li>
                            <li>- Transitions on fold / unfold</li>
                            <li>- Alphabetical sort</li>
                            <li>- Search bar</li>
                        </ul>
                    </div>
                }
                files={[
                    "./components/Sections/TreeView/TreeViewDemo.js",
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
