// @flow

import React from "react"

import "./howto.css"

import { jscode } from "../../../tools/tools"

export default {
    title: "How-to",
    content:
        <div>
            <h3>
                <span className="bubble-icon red"><i className="fa fa-crosshairs"></i></span>
                <em>1 - Pick a view</em>
            </h3>

            <div className="marged separate">
                <h4><em><a href="#TreeView">TreeView</a></em></h4>
                <span>
                    TreeView is the generic view, suited for all purposes.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a>ExplorerView</a></em></h4>
                <span>
                    A file explorer like preset.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a>MenuView</a></em></h4>
                 <span>
                    A view best suited for menus.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a>FlatView</a></em></h4>
                 <span>
                    A flat view.
                </span>
            </div>

            <h3>
                <span className="bubble-icon green"><i className="fa fa-cogs"></i></span>
                <em>2 - Import and render</em>
            </h3>

            <p>In order to use the component, you must import it from <em>bosket/react.</em></p>

            { jscode`
                import React from "react"
                import { /* Component */ } from "bosket/react"

                // Then render it.
                const functionalComponent = _ =>
                    <Component /* component properties */></Component>
                ` }

            <p>That's it !</p>

            <h3>
                <span className="bubble-icon blue"><i className="fa fa-paint-brush"></i></span>
                <em>3 - Style with css</em>
            </h3>

            <p>
                <em>Once the component is included and rendered in your code, you will need to style it using css, otherwise it will look as pretty as a good old html unordered list.</em><br/>
                <br/>
                You will find an <em><a href="#TreeView#Css#Empty stylesheet">empty stylesheet</a></em> with classes and elements already filled for each components in their own documentation section.<br/>
                Also, feel free to peek at the demos css source code which is included.<br/>
                <br/>
                Don't forget, if you would like to change the class names they can be overrided by changing the <em><a href="#TreeView#Optional props#css">css property</a></em>.
                <br/>
                You should also have a look at the <em><a href="#TreeView#Css#Layout">TreeView component html layout</a></em> (presets share almost the same layout).
            </p>

        </div>
}
