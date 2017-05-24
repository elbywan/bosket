import "./ExplorerDemo.css"

import React from "react"

import { ExplorerTree } from "../../../../../src/react"
import { tree } from "../../../../../src/tools"
import model from "../../../../common/models/ExplorerTreeModel"

import helpers from "./helpers"


export class ExplorerDemo extends React.PureComponent {

    /* Rendering */

    render = () => <ExplorerTree selection={ this.props.selection } { ...this.state }></ExplorerTree>

    /* State passed down */

    state = {
        // Data model populating the tree
        model: model,
        // Property of a directory containing its contents
        category: "files",
        // Name property  of a file or directory
        nameProperty: "filename",
        // On select event, update the selection array
        onSelect: function(items) { this.props.update({ selection: items }) }.bind(this),
        // Custom label for the search input
        labels: { "search.placeholder": "Find a file or a folder" },
        // On model update, set state
        updateModel: function(model) { this.setState({ model: model }) },
        // Custom icon for displayed files & folders
        display: item => <a><i className={"icon fa " + helpers.getIcon(item)}></i>{ item.filename }</a>,
        strategies: {
            click: [(item, event, ancestors, neighbours) => {
                // Update current directory text on change //
                if(item.files) {
                    this.props.update({ lastFolder: item })
                    this.props.update({ path: "/" + [ ...ancestors, item ].map(a => a.filename).join("/") })
                } else {
                    this.props.update({ lastFolder: ancestors[ancestors.length - 1] })
                    this.props.update({ path: "/" + ancestors.map(a => a.filename).join("/") })
                }
            }],
            fold: [(item, lastState) => {
                // On real filesystem elements, update size as we navigate //
                item.files.forEach(item => {
                    if(item.fsEntry) {
                        item.fsEntry.getMetadata && item.fsEntry.getMetadata(metadata => item.size = metadata.size)
                        delete item.fsEntry
                    }
                })
                return lastState
            }]
        },
        dragndrop: {
            drop: (target, item, event) => {
                const items = event.dataTransfer.items

                // Allow real filesystem drop //
                if(items && items.length > 0 && items[0].kind === "file") {
                    const targetModel = target ? target[this.state.category] : this.state.model.slice()

                    for(let i = 0; i < items.length; i++) {
                        const item = items[i].webkitGetAsEntry()
                        if(item) {
                            helpers.scanFiles.bind(this)(item, targetModel)
                        }
                    }
                    this.setState({ model: targetModel })
                } else {
                    // "Standard"" drop //
                    let updatedModel = tree(this.state.model, this.state.category).filter(e => this.props.selection.indexOf(e) < 0)
                    if(target)
                        target[this.state.category] = [ ...target[this.state.category], ...this.props.selection ]
                    else
                        updatedModel = [ ...updatedModel, ...this.props.selection ]
                    this.setState({ model: updatedModel })
                }
            }
        }
    }

}