// @flow

import "./index.css"

import React from "react"
import { jscode } from "self/react/tools"

import { DragTree, DropTree } from "./example"

export default {
    title: "dragndrop",
    content:
        <div className="marged">
            <p>The drag'n'drop configuration object.</p>

            <div className="emphasis">
                Defaults to :
                { jscode`
                    dragndrop: {
                        draggable: false, // make items draggable
                        droppable: false, // make the tree droppable
                        drag: null,       // action to perform on drag
                        drop: null,       // action to perform on drop
                        cancel: null      // action to perform on cancellation
                    }` }
            </div>

            <p>Tip: for mobile drag'n'drop, use a <em><a target="_blank" rel="noopener noreferrer" href="https://github.com/Bernardo-Castilho/dragdroptouch">polyfill</a></em>.</p>

            { jscode`
                /* [Drag'n'drop presets](https://github.com/elbywan/bosket/blob/master/src/core/dragndrop.js) */

                import { dragndrop } from "bosket/core/dragndrop"

                /* ... */

                state = {
                    model:      /* ... */,
                    selection:  /* ... */
                }

                dragndrop = {
                    // To drag or drop on specific items
                    // you can use a function : (item) => true/false
                    draggable: true,
                    droppable: true,

                    // target       -> item dragged
                    // event        -> original drag event
                    // inputs       -> props of the component where the drag is triggered
                    drag: (target, event, inputs) => {
                        /* ... */
                    },

                    // target       -> item on which the drop occured
                    // item         -> the item which is dropped
                    // inputs       -> props of the component where the drop is triggered
                    drop: (target, item, event) => {
                        /* ... */
                    },

                    // target       -> the dragged item
                    // item         -> the item which is dropped
                    // inputs       -> props of the component where the drag was triggered
                    cancel: (target, item, event) => {
                        /* ... */
                    }
                }

                <TreeView /* ... */ dragndrop={ this.dragndrop }></TreeView>`}

            <p>Example of a draggable tree associated with a droppable tree :</p>

            <DragTree/><DropTree/>

            { jscode`
                    import React from "react"

                    import { TreeView } from "bosket/react"
                    import { dragndrop } from "bosket/core"

                    /* Model */
                    const dragModel = [
                        { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
                        { name: 2, children: [{ name: 21 }, { name: 22 }]},
                        { name: 3 },
                        { name: 4 }
                    ]

                    /* Common conf. */
                    const conf = function() {
                        return {
                            model: this.state.model,
                            category: "children",
                            selection: this.state.selection,
                            onSelect: _ => this.setState({ selection: _ }),
                            display: i => i.name,
                            strategies: { fold: [() => false]}
                        }
                    }

                    /* Drag only tree */
                    export const DragTree = class extends React.PureComponent {
                        state = { selection: [], model: dragModel }
                        render = () =>
                            <div className="tree-sample">
                                <TreeView
                                    { ...conf.bind(this)() }
                                    // Pluck preset
                                    dragndrop={ dragndrop.pluck(() => this.state.model, m => this.setState({ model: m })) }>
                                </TreeView>
                            </div>
                    }

                    /* Drop only tree */
                    export const DropTree = class extends React.PureComponent {
                        state = { selection: [], model: [{ name: "< Drop items here >", children: []}]}
                        render = () =>
                            <div className="tree-sample">
                                <TreeView
                                    { ...conf.bind(this)() }
                                    // Paste preset + only drop on items with children
                                    dragndrop={{
                                        ...dragndrop.paste(() => this.state.model, m => this.setState({ model: m })),
                                        droppable: item => item && item.children
                                    }}
                                />
                            </div>
                    }
                ` }
        </div>
}
