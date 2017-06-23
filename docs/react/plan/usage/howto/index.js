// @flow

import React from "react"

import { jscode, htmlcode } from "self/react/tools"

export default {
    title: "Start",
    content:
        <div>
            <h3>
                <span className="bubble-icon red large dark"><i className="fa fa-crosshairs"></i></span>
                <em>1 - Pick a view</em>
            </h3>

            <p>
                Bosket/react contains a generic <em><a href="#TreeView">TreeView component</a></em>, and <em><a href="#Components">preset components</a></em>.<br/>
                <br/>
                Presets are higher order components wrapping and configuring a TreeView. Some presets also provide additional functionalities.
            </p>

            <div className="separate" style={{ borderWidth: "2px" }}>
                <h4><em><a href="#TreeView">TreeView</a></em></h4>
                <span>
                    TreeView is the generic view, suited for all purposes. This should be your default pick.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a href="#Presets#ExplorerView">ExplorerView preset</a></em></h4>
                <span>
                    A file explorer like preset with drag'n'drop, multi selection using keyboard modifiers, sorted elements and search.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a href="#Presets#MenuView">MenuView preset</a></em></h4>
                 <span>
                    A preset best suited for nested menus with automatic item folding/unfolding and ancestors selection.
                </span>
            </div>

            <div className="marged separate">
                <h4><em><a href="#Presets#FlatView">FlatView preset</a></em></h4>
                 <span>
                    A flat view preset, with all items unfolded (all visible) and multi selection.
                </span>
            </div>

            <h3>
                <span className="bubble-icon green large dark"><i className="fa fa-cogs"></i></span>
                <em>2 - Render</em>
            </h3>

            <p>In order to use the component, you must import it from <em>bosket/react</em>, then render it anywhere in your react code.</p>

            { jscode`
                import React from "react"
                import { /* Component */ } from "bosket/react"

                // Then render it.
                const anywhere = _ => <Component /* component properties */></Component>
                ` }

            <p><em>That's it !</em></p>

            <h3>
                <span className="bubble-icon blue large dark"><i className="fa fa-paint-brush"></i></span>
                <em>3 - Style with css</em>
            </h3>

            <p>
                <em>Once the component is included and rendered in your code, you will need to style it using css, otherwise it will look like a good old fashioned html unordered list.</em><br/>
                <br/>
                You will find an <em><a href="#TreeView#Css#Empty stylesheet">empty stylesheet</a></em> with classes and elements already filled for each components in their own documentation section.<br/>
                Also, feel free to peek at the included <em><a href="#TreeView#Demo">demos css source code</a></em>.
            </p>

            { htmlcode`
                <head>
                    <!-- ... -->
                    <link rel="stylesheet" type="text/css" href="[your bosket stylesheet].css">
                    <!-- ... -->
                </head>` }

            <p>
                Don't forget, if you would like to change the class names they can be overrided by changing the <em><a href="#TreeView#Optional props#css">css property</a></em>.
                <br/>
                You should also have a look at the <em><a href="#TreeView#Css#Layout">TreeView component html layout</a></em> (presets share almost the same layout).
            </p>

        </div>
}
