import React from "react"

import { jscode } from "../../../tools/tools"

export default {
    title: "Required props",
    subs: [
        {
            title: "model",
            content:
                <div className="marged">
                    <p>
                        An array of objects which is used to populate the component.<br/>
                        The format is detailed in the <em><a href="#Usage#Data model">data model</a></em> section.
                    </p>
                    { jscode`
                    const model = [
                        { label: "One" },
                        { label: "Two" },
                        { label: "Three", list: [
                            { label: "Four" },
                            { label: "Five" }
                        ] }
                    ]

                    <TreeView /* ... */ model={ model }></TreeView>` }
                </div>
        },
        {
            title: "category",
            content:
                <div className="marged">
                    <p>
                        The name of the property containing the children.<br/>
                        In the above example, it would be list.
                    </p>
                    <pre><code className="language-javascript">{ '<TreeView /* ... */ category="list"></TreeView>' }</code></pre>
                </div>
        },
        {
            title: "selection",
            content:
                <div className="marged">
                    <p>
                        The array which contains the selected objects from the model.
                    </p>
                    { jscode`
                    const selection = []

                    <TreeView /* ... */ selection={ selection }></TreeView>` }
                </div>
        },
        {
            title: "onSelect",
            content:
                <div className="marged">
                    <p>
                        A callback which is fired when the selection has been updated (usually when the user clicks on an item).<br/>
                        This method should update the <em><a href="#TreeView#Required props#selection">selection array</a></em>.
                    </p>
                    { jscode`
                    // Partial example of a component rendering an TreeView.

                    class Example extends React.Component {
                        state = {
                            selection: [],
                            onSelect: (newSelection, item, ancestors, neighbours) => {
                                // newSelection     -> updated array containing all the selected items
                                // item             -> the newly selected item (excluding the old one in case of multi selection)
                                // ancestors        -> the ancestors of the newly selected item
                                // neighbours       -> the neighbours of the newly selected item
                                this.setState({ selection: newSelection })
                            }
                        }

                        render = () =>
                            <TreeView /* ... */ onSelect={ onSelect }></TreeView>
                    }` }
                </div>
        }
    ]
}