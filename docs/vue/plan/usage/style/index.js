import { htmlcode } from "self/vue/tools"

export default {
    title: "Style",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/usage/style/index.js",
    content: h =>
        <div>
            <p>
                <em>Once the component is included and rendered in your code, you will need to style it using css, otherwise it will look like a good old fashioned html unordered list.</em><br/>
                <br/>
                Have a look at <em><a href="#TreeView#Css#Empty stylesheet">the empty stylesheet</a></em> with classes and elements already filled.<br/>
                Also, feel free to peek at the included <em><a href="#TreeView#Demo">demos css source code</a></em>.
            </p>

            { htmlcode`
                <head>
                    <!-- ... -->
                    <link rel="stylesheet" type="text/css" href="[your bosket stylesheet].css">
                    <!-- ... -->
                </head>`(h) }

            <p>
                The css class names can be overrided by changing the <em><a href="#TreeView#Optional properties#css">css property</a></em>.
                <br/>
                You should also check the full <em><a href="#TreeView#Css#Layout">html layout</a></em>.
            </p>
        </div>
}
