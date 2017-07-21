import React from "react"

import { MenuViewSection } from "self/react/components/Demos"
import { jscode } from "self/react/tools"

export default {
    title: "MenuView",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/MenuView/index.js",
    content:
        <p>
            A preset best suited for nested menus with automatic item folding/unfolding and ancestors selection.
        </p>,
    subs: [
        {
            title: "Basic Usage",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/MenuView/index.js",
            content:
                <div>
                    <p>
                        To use the MenuView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then render it.<br/>
                        <br/>
                        Appearance can be tweaked with <em><a href="#TreeView#Css">css</a></em> styles.
                    </p>
                    { jscode`
                        import { MenuView } from "bosket/react"

                        const usage = _ =>
                            <MenuView
                                /* [Use the TreeView components props](#TreeView#Basic Usage) */

                                /* Additional properties are required for this preset : */

                                name={ /* [The name of the property containing the displayed label.](#Presets#MenuView#Additional props#name) */ }

                                /* The following properties are already set by the preset :
                                    - display
                                    - key
                                    - strategies
                                    - noOpener
                                */
                            ></MenuView>
                    ` }
                </div>
        },
        {
            title: "Demo",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/MenuView/index.js",
            content:
                <div>
                    <h4>
                        <a download="BosketMenuView.css" href="./components/Demos/MenuView/MenuViewWindow.css" className="anchor-button basic-button">
                            <i className="fa fa-download"></i>
                            Download stylesheet
                        </a>
                    </h4>
                    <MenuViewSection></MenuViewSection>
                </div>
        },
        {
            title: "Additional props",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/presets/MenuView/index.js",
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
                            <MenuView /* ... */ name={ label }></MenuView>` }
                        </div>
                }
            ]
        }
    ]
}
