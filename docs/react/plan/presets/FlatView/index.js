import React from "react"

import { FlatViewSection } from "self/react/components/Demos"
import { jscode } from "self/react/tools"

export default {
    title: "FlatView",
    content:
        <p>
            A flat view preset, with all items unfolded (all visible) and multi selection.
        </p>,
    subs: [
        {
            title: "Basic Usage",
            content:
                <div>
                    <p>
                        To use the FlatView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then render it.<br/>
                        <br/>
                        Appearance can be tweaked with <em><a href="#TreeView#Css">css</a></em> styles.
                    </p>
                    { jscode`
                        import { FlatView } from "bosket/react"

                        const usage = _ =>
                            <FlatView
                                /* [Use the TreeView components props](#TreeView#Basic Usage) */

                                /* Additional properties are required for this preset : */

                                name={ /* [The name of the property containing the displayed label.](#Presets#ExplorerView#Additional props#name) */ },
                                limit={ /* [Maximum number of selected items.](#Presets#ExplorerView#Additional props#limit)  */ }

                                /* The following properties are already set by the preset :
                                    - display
                                    - key
                                    - strategies
                                    - disabled
                                    - noOpener
                                */
                            ></FlatView>
                    ` }
                </div>
        },
        {
            title: "Demo",
            content:
                <div>
                    <h4><button className="basic-button">
                        <i className="fa fa-download"></i>
                        <a download="BosketFlatView.css" href="./components/Demos/FlatView/FlatViewWindow.css">Download stylesheet</a>
                    </button></h4>
                    <FlatViewSection></FlatViewSection>
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
                                Also used for unicity.
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
                    title: "limit",
                    content:
                        <div className="marged">

                        { jscode`
                            // At most 3 items can be selected at the same time. Others will be disabled.
                            // 0 = no limit
                            <ExplorerView /* ... */ limit={ 3 }></ExplorerView>`}
                        </div>
                }
            ]
        }
    ]
}
