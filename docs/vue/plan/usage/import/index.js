import { jscode } from "self/vue/tools"

export default {
    title: "Import",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/import/index.js",
    content: h =>
        <span>
            <p>Preferred way of loading Bosket is to use ES2015 modules.</p>

            { jscode`
                import { TreeView } from "bosket/vue"

                {
                    // Your vue.js component excerpt //

                    // If you use [render functions](https://vuejs.org/v2/guide/render-function.html), no need to register the component :
                    render() {
                        return <TreeView /* + props... */ />
                    },

                    // If you use the component in templates, you need to [register it](https://vuejs.org/v2/guide/components.html#Registration).
                    components: {
                        "tree-view": TreeView
                    },
                    // And use it inside the template :
                    template: '<tree-view v-bind="props"/></tree-view>'
                }
            `(h) }
        </span>
}
