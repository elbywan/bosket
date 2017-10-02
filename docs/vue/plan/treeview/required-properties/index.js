import { jscode } from "self/vue/tools"

export default {
    title: "Required properties",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/required-properties/index.js",
    subs: [
        {
            title: "model",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/required-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">Object[]</pre>
                    <p>
                        An array of objects which is used to populate the component.<br/>
                        The format is detailed in the <em><a href="#Usage#Data model">data model</a></em> section.
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

                    <TreeView /* ... */ :model="model"></TreeView>`(h) }
                </div>
        },
        {
            title: "category",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/required-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">string</pre>
                    <p>
                        The name of the property containing the children.<br/>
                        In the example above, it would be "list".
                    </p>
                    { jscode`<TreeView /* ... */ category="list"></TreeView>`(h) }
                </div>
        },
        {
            title: "selection",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/required-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">Object[]</pre>
                    <p>
                        An array which references the selected objects.
                    </p>
                    { jscode`
                    const selection = []

                    <TreeView /* ... */ :selection="selection"></TreeView>`(h) }
                </div>
        },
        {
            title: "onSelect",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/required-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(newSelection: Object[], item: Object, ancestors: Object[], neighbours: Object[]) => void</pre>
                    <p>
                        A callback which is fired when the selection is updated (for instance when the user clicks on an item).<br/>
                        This method should update the <em><a href="#TreeView#Required properties#selection">selection array</a></em>.
                    </p>
                    { jscode`
                    // Partial example of a component rendering a TreeView.
                    import { TreeView } from "@bosket/vue"

                    export default {
                        name: "MyVueComponent",
                        components: {
                            "tree-view": TreeView
                        },
                        template: '<tree-view /* ... */ :selection="selection" :onSelect="onSelect"></tree-view>',
                        data: () => ({
                            selection: [],
                            onSelect: function(newSelection) { this.selection = newSelection },
                            /* ... */
                        })
                    }`(h) }
                </div>
        }
    ]
}
