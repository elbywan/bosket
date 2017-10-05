import { jscode, tscode } from "self/vue/tools"
import { indent } from "self/common/tools"
import dragndrop from "./dragndrop"

export default {
    title: "Optional properties",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
    subs: [
        {
            title: "display",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(item: Object, inputs: Object) => any</pre>
                    <p>
                        A custom rendering function.
                    </p>
                    <div class="emphasis">
                        Defaults to the&nbsp;
                        <em><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" target="_blank" rel="noopener noreferrer">toString</a></em>&nbsp;
                        function.

                        { jscode`display: _ => _.toString()`(h) }
                    </div>
                    { jscode`
                    // Sample vue component

                    export default {
                        data: () => ({
                            // We wrap the items in an anchor, display the label property
                            // and add an extra exclamation mark.
                            display: (item, inputs) =>
                                <a href={ item.link }>{ item.label } !</a>,
                            /* ... */
                        }),
                        // Note that as the display function is written inside the component
                        // the [pragma is auto-injected](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection).
                        render: h =>
                            <TreeView
                                /* ... */
                                display={ this.display }>
                            </TreeView>

                    }`(h) }
                </div>
        },
        {
            title: "unique",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(item: Object) => string | number</pre>
                    <p>
                        A function returning a unique <em><a href="https://vuejs.org/v2/api/#key" target="_blank" rel="noopener noreferrer">key</a></em> used by Vue.js to identify nodes and perform list updates.<br/>
                    </p>
                    <div class="emphasis">
                         If not provided, defaults to the index of the item in the list.
                    </div>
                    { jscode`
                    const unique = item => item.id

                    <TreeView /* ... */ :unique="unique"></TreeView>`(h) }
                </div>
        },
        {
            title: "strategies",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">{ indent`
                        {
                            selection: (string | selectionStrategy)[],
                            click: (string | clickStrategy)[],
                            fold: (string | foldStrategy)[]
                        }
                    `}</pre>
                    <p>
                        <em>Strategies determine the action(s) to perform on click, fold or selection.</em><br/><br/>
                        The <em>strategies prop</em> is an object containing 3 properties (click, fold, selection). Each property value is an array of strategies.<br/>
                        A <em>strategy</em> is either a string (containing a predefined strategy name), or a function (executed in the tree context).<br/><br/>
                        In case of multiple strategies, they are chained.
                    </p>

                    { tscode`
                        type selectionStrategy<Item extends Object> = (item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>
                        type clickStrategy<Item extends Object> = (item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void
                        type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean
                    `(h) }

                    <div class="emphasis">
                        Defaults to : { jscode`
                        {
                            // One item selected at a time
                            selection: ["single"],
                            // No click callbacks
                            click: [],
                            // Folds an item when itself or its children are not selected
                            fold: [ "not-selected", "no-child-selection" ]
                        }`(h)}
                    </div>

                    { jscode`
                    // The object is mixed in with the default properties, so you can override only the keys you want.
                    const strategies = {
                        // Select only the items beginning with the letter a
                        selection: ["multiple", (item, selection) => selection.filter(elt => elt.label.charAt(0) === 'a' )]
                        click: ["unfold-on-selection"],
                        fold: ["opener-control", "no-child-selection"]
                    }

                    <TreeView /* ... */ :strategies="strategies"></TreeView>`(h) }

                    <p>Check the <em><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js" target="_blank" rel="noopener noreferrer">strategies.js file</a></em> for the list of available strategies and descriptions.</p>
                </div>
        },
        {
            title: "sort",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(item1, item2) => boolean</pre>
                    <p>A custom sorting function.</p>
                    { jscode`
                        const sort = (a, b) => a.label.localeCompare(b.label)

                        <TreeView /* ... */ :sort="sort"></TreeView>`(h) }
                </div>
        },
        {
            title: "disabled",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(item: Object) => boolean</pre>
                    <p>Disables elements based on the result of the provided function, which prevents selection and apply the css 'disabled' class.</p>
                    { jscode`
                        // Disable elements having children
                        const disabled = item => !item.children

                        <TreeView /* ... */ :disabled="disabled"></TreeView>`(h) }
                </div>
        },
        {
            title: "search",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(query: string) => (item: Object) => boolean</pre>
                    <p>If provided, enables the built-in search bar and is called when the user types a search query.</p>
                    { jscode`
                        const search = input => item => item.label.match(new RegExp(\`.*\${ input }.*\`, "gi"))

                        <TreeView /* ... */ :search="search"></TreeView>`(h) }
                </div>
        },
        {
            title: "async",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">(mixed => Promise&lt;Object[]&gt;) => Promise&lt;Object[]&gt;</pre>
                    <p>A function used to unwrap <em><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise" target="_blank" rel="noopener noreferrer">Promises</a></em> in case of asynchronous children.</p>

                    <div class="emphasis">
                        Defaults to simple method call :
                        { jscode`
                            _ => _()`(h) }
                    </div>

                    { jscode`
                        const model = [{
                            label: "Asynchronous children",
                            children: timer =>
                                 new Promise(resolve =>
                                    setTimeout(() =>
                                        resolve([{ label: "timer is provided by the async property" }]), timer))
                        }]

                        const async = _ => _(Math.random() * 1000 + 500)

                        <TreeView /* ... */ :async="async" :model="model"></TreeView>`(h) }
                </div>
        },
        dragndrop,
        {
            title: "openerOpts",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">{"{"} position: "none" | "left" | "right" {"}"}</pre>
                    <p>Positions the opener, which is usually the little arrow or arrow-like icon used to unfold a node.</p>
                    <div class="emphasis">Defaults to "right"</div>
                    { jscode`
                        <TreeView /* ... */ :openerOpts="{ position: 'left' }"></TreeView>`(h) }
                </div>
        },
        {
            title: "labels",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">Object</pre>
                    <p>Labels override.</p>
                    <div class="emphasis">
                        Defaults to :
                        { jscode`
                            labels: {
                                "search.placeholder": "Search ..."
                            }`(h)}
                    </div>
                    { jscode`
                        const labels = {
                            "search.placeholder": "I am the text displayed in the search bar as a placeholder."
                        }

                        <TreeView /* ... */ :labels="labels"></TreeView>`(h) }
                </div>
        },
        {
            title: "css",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">Object</pre>
                    <p>Css classnames override.</p>
                    <div class="emphasis">
                        Defaults to :
                        { jscode`
                            css: {
                                TreeView:           "TreeView",
                                opener:             "opener",
                                depth:              "depth",
                                selected:           "selected",
                                category:           "category",
                                folded:             "folded",
                                disabled:           "disabled",
                                async:              "async",
                                loading:            "loading",
                                nodrop:             "nodrop",
                                dragover:           "dragover",
                                search:             "search",
                                item:               "item"
                            }`(h) }
                    </div>
                    { jscode`
                        const css = { TreeView: "CustomTree", loading: "customLoading" }

                        <TreeView /* ... */ :css="css"></TreeView>
                    `(h) }
                </div>
        },
        {
            title: "transition",
            editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/optional-properties/index.js",
            content: h =>
                <div class="marged">
                    <pre class="itemType">Object</pre>
                    <p>Creation / destruction transitions using <em><a href="https://vuejs.org/v2/guide/transitions.html" target="_blank" rel="noopener noreferrer">Vue transition effects</a></em>.</p>

                    { jscode`
                        // Vue.js [vnode format](https://github.com/vuejs/babel-plugin-transform-vue-jsx#difference-from-react-jsx).
                        const transition = {
                            attrs: { appear: true },
                            props: { name: "TransitionName" }
                        }

                        <TreeView /* ... */ :transition="transition"></TreeView>`(h) }
                </div>
        }
    ]
}
