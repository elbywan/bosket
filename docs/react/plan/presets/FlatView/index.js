import React from "react"

import { FlatViewSection } from "self/react/components/Demos"
import { jscode } from "self/react/tools"

export default {
    title: "FlatView",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
    content:
        <p>
            A flat view preset, with all items unfolded (all visible) and multi selection.
        </p>,
    subs: [
        {
            title: "Basic Usage",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
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

                                name={ /* [The name of the property containing the label to display.](#Presets#FlatView#Additional props#name) */ },
                                limit={ /* [Maximum number of selected items.](#Presets#FlatView#Additional props#limit)  */ }

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
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
            content:
                <div>
                    <h4>
                        <a download="BosketFlatView.css" href="./components/Demos/FlatView/FlatViewWindow.css"  className="anchor-button basic-button">
                            <i className="fa fa-download"></i>
                            Download stylesheet
                        </a>
                    </h4>
                    <FlatViewSection></FlatViewSection>
                </div>
        },
        {
            title: "Additional props",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
            subs: [
                {
                    title: "name",
                    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
                    content:
                        <div className="marged">
                            <pre className="itemType">string</pre>
                            <p>
                                The name of the property containing the label to display.<br/>
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
                    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/FlatView/index.js",
                    content:
                        <div className="marged">
                            <pre className="itemType">number</pre>
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
