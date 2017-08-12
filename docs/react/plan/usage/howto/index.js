// @flow

import React from "react"

import { jscode, htmlcode } from "self/react/tools"

export default {
    title: "Start",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/howto/index.js",
    content:
        <div>
            <h3><em>Pick a view</em></h3>

            <p>
                Bosket/react contains a generic <em><a href="#TreeView">TreeView component</a></em>, and <em><a href="#Components">preset components</a></em>.<br/>
                <br/>
                Presets are higher order components wrapping and configuring a TreeView. Some presets also provide additional functionalities.
            </p>
            <ul className="pick-list">
                <li>
                    <h5 className="emphasis"><em><a href="#TreeView">TreeView</a></em></h5>
                    <p>TreeView is the generic view, suited for all purposes. This should be your default pick.</p>
                </li>
                <li>
                    <h5 className="emphasis"><em><a href="#Presets#ExplorerView">ExplorerView preset</a></em></h5>
                    <p>A file explorer like preset with drag'n'drop, multi selection using keyboard modifiers, sorted elements and search.</p>
                </li>
                <li>
                    <h5 className="emphasis"><em><a href="#Presets#MenuView">MenuView preset</a></em></h5>
                    <p>A preset best suited for nested menus with automatic item folding/unfolding and ancestors selection.</p>
                </li>
                <li>
                    <h5 className="emphasis"><em><a href="#Presets#FlatView">FlatView preset</a></em></h5>
                    <p>A flat view preset, with all items unfolded (all visible) and multi selection.</p>
                </li>
            </ul>

            <h3><em>Render</em></h3>

            <p>In order to use the component, you must import it from <em>bosket/react</em>, then render it anywhere in your react code.</p>

            { jscode`
                import React from "react"
                import { /* Component */ } from "bosket/react"

                // Then render it.
                const anywhere = _ => <Component /* component properties */></Component>
                ` }

            <p><em>That's it !</em></p>

            <h3><em>Style with css</em></h3>

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
                Don't forget, if you would like to change the class names they can be overrided by changing the <em><a href="#TreeView#Optional properties#css">css property</a></em>.
                <br/>
                You should also have a look at the <em><a href="#TreeView#Css#Layout">TreeView component html layout</a></em> (presets share almost the same layout).
            </p>

        </div>
}
