import React from "react"

import { htmlcode } from "self/react/tools"

export default {
    title: "Style",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/style/index.js",
    content:
        <div>
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
