import { jscode } from "self/vue/tools"

export default {
    title: "Import",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/import/index.js",
    content: h => jscode`
        import { TreeView } from "@bosket/vue"

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
            // And use it inside a template :
            template: '<tree-view props="..."></tree-view>'
        }`(h)
}
