import React from "react"

import { ExplorerViewSection } from "self/react/components/Demos"
import { jscode } from "self/react/tools"

export default {
    title: "ExplorerView",
    content:
        <p>
            A file explorer like preset with drag'n'drop, multi selection using keyboard modifiers, sorted elements and search.
        </p>,
    subs: [
        {
            title: "Basic Usage",
            content:
                <div>
                    <p>
                        To use the ExplorerView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then render it.<br/>
                        <br/>
                        Appearance can be tweaked with <em><a href="#TreeView#Css">css</a></em> styles.
                    </p>
                    { jscode`
                        import { ExplorerView } from "bosket/react"

                        const usage = _ =>
                            <ExplorerView
                                /* [Use the TreeView components props](#TreeView#Basic Usage) */

                                /* Additional properties are required for this preset : */

                                name={ /* [The name of the property containing the displayed label.](#Presets#ExplorerView#Additional props#name) */ },
                                updateModel={ /* [Called on model change.](#Presets#ExplorerView#Additional props#updateModel)  */ }

                                /* The following properties are already set by the preset :
                                    - display
                                    - sort
                                    - key
                                    - search
                                    - strategies
                                    - dragndrop
                                */
                            ></ExplorerView>
                    ` }
                </div>
        },
        {
            title: "Demo",
            content:
                <div>
                    <h4><button className="basic-button">
                        <i className="fa fa-download"></i>
                        <a download="BosketExplorerView.css" href="./components/Demos/ExplorerView/ExplorerViewWindow.css">Download stylesheet</a>
                    </button></h4>
                    <ExplorerViewSection></ExplorerViewSection>
                </div>
        },
        {
            title: "Additional props",
            subs: [
                {
                    title: "name",
                    content:
                        <div className="marged">
                            <p>
                                The name of the property containing the displayed label.<br/>
                                Also used for sorting, searching and as a unique key.
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

                            // The label is displayed. ("One, "Two", "Three" ...)
                            <ExplorerView /* ... */ name={ label }></ExplorerView>` }
                        </div>
                },
                {
                    title: "updateModel",
                    content:
                        <div className="marged">
                            { jscode`
                                // On model update (for instance when drag'n'dropping item(s)) :
                                const updateModel = function(model: Object[]) {
                                    this.setState({ model: model })
                                }

                                <ExplorerView /* ... */ updateModel={ updateModel }></ExplorerView>`}
                        </div>
                }
            ]
        }
    ]
}
