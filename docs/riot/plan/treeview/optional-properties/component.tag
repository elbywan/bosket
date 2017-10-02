<display-prop>
    <div class="marged">
        <pre class="itemType">(item: Object, inputs: Object) => string</pre>
        <p>
            A custom rendering function. Called for every item, its return value is displayed in the view.<br>
            The "inputs" argument is an object containing the input properties of the component which is rendering the item.
        </p>
        <div class="emphasis">
            Defaults to the&nbsp;
            <em><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" target="_blank" rel="noopener noreferrer">toString</a></em>&nbsp;
            function.

            <syntax-highlight>item => item.toString()</syntax-highlight>
        </div>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ display={ display } />
            <script>
                // The display function is run for every item in the model.
                // Here, we choose to display the 'label' property in lower case.
                this.display = item => item.display.toLowerCase()
            <\/script>` // eslint-disable-line
    </script>
</display-prop>

<displaytag-prop>
    <div class="marged">
        <pre class="itemType">(item: Object, inputs: Object) => string</pre>
        <p>
            <em>The display and displaytag properties are mutually exclusive.</em><br>
            <br>
            Allows more customization than the display property, by wrapping items inside a custom tag.<br>
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
        <TreeView /* ... */ displaytag={ displaytag } />

        <script>
            // A custom defined tag used to wrap items in an anchor tag
            // opts.item is a reference to the displayed item
            riot.tag("customtag", "<a href={ opts.item.link }>{ opts.item.label }</a>")
            this.displaytag = () => "customtag"
        <\/script>` // eslint-disable-line
    </script>
</displaytag-prop>

<strategies-prop>
    <div class="marged">
        <pre class="itemType">{ strategies }</pre>
        <p>
            <em>Strategies determine the action(s) to perform on click, fold or selection.</em><br/><br/>
            The <em>strategies prop</em> is an object containing 3 properties (click, fold, selection). Each property value is an array of strategies.<br/>
            A <em>strategy</em> is either a string (containing a predefined strategy name), or a function (executed in the tree context).<br/><br/>
            In case of multiple strategies, they are chained.
        </p>

        <syntax-highlight language="typescript">{ parent.type }</syntax-highlight>

        <div class="emphasis">
            Defaults to :
            <syntax-highlight>{ parent.default }</syntax-highlight>
        </div>

        <syntax-highlight>{ parent.code }</syntax-highlight>

        <p>Check the <em><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js" target="_blank" rel="noopener noreferrer">strategies.js file</a></em> for the list of available strategies and descriptions.</p>
    </div>

    <script>
    import { indent } from "self/common/tools"

        this.strategies = indent`
            {
                selection: (string | selectionStrategy)[],
                click: (string | clickStrategy)[],
                fold: (string | foldStrategy)[]
            }
        `
        this.type = `
            type selectionStrategy<Item extends Object> = (item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>
            type clickStrategy<Item extends Object> = (item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void
            type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean`
        this.default = `
            {
                // One item selected at a time
                selection: ["single"],
                // No click callbacks
                click: [],
                // Folds an item when itself or its children are not selected
                fold: [ "not-selected", "no-child-selection" ]
            }`
        this.code =`
            <TreeView /* ... */ strategies={ strategies } />

            <script>
                // The object is mixed in with the default properties, so you can override only the keys you want.
                this.strategies = {
                    // Select only the items beginning with the letter a
                    selection: ["multiple", (item, selection) => selection.filter(elt => elt.label.charAt(0) === 'a' )]
                    click: ["unfold-on-selection"],
                    fold: ["opener-control", "no-child-selection"]
                }
            <\/script> // eslint-disable-line
        `

    </script>
</strategies-prop>

<sort-prop>
    <div class="marged">
        <pre class="itemType">(item1, item2) => boolean</pre>
        <p>A custom sorting function.</p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>
    <script>

        this.code = `
            <TreeView /* ... */ sort={ sort } />
            <script>
                this.sort = (a, b) => a.label.localeCompare(b.label)
            <\/script>`
    </script>
</sort-prop>

<disable-prop>
    <div class="marged">
        <pre class="itemType">(item: Object) => boolean</pre>
        <p>Disables elements based on the result of the provided function, which prevents selection and apply the css 'disabled' class.</p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ disable={ disable } />
            <script>
                this.disable = item => !item.children
            <\/script>`
    </script>
</disable-prop>

<search-prop>
    <div class="marged">
        <pre class="itemType">(query: string) => (item: Object) => boolean</pre>
        <p>If provided, enables the built-in search bar and is called when the user types a search query.</p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ search={ search } />
            <script>
                this.search = input => item => item.label.match(new RegExp(\`.*\${ input }.*\`, "gi"))
            <\/script>`
    </script>
</search-prop>

<async-prop>
    <div class="marged">
        <pre class="itemType">(mixed => Promise&lt;Object[]&gt;) => Promise&lt;Object[]&gt;</pre>
        <p>A function used to unwrap <em><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise" target="_blank" rel="noopener noreferrer">Promises</a></em> in case of asynchronous children.</p>

        <div class="emphasis">
            Defaults to simple method call :
            <syntax-highlight>_ => _()</syntax-highlight>
        </div>

        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ async={ async } model={ model } />

            <script>
                this.model = [{
                    label: "Asynchronous children",
                    children: timer =>
                         new Promise(resolve =>
                            setTimeout(() =>
                                resolve([{ label: "timer is provided by the async property" }]), timer))
                }]
                this.async = _ => _(Math.random() * 1000 + 500)
            <\/script>`
    </script>
</async-prop>

<dragndrop-prop>
    <div class="marged">
        <pre class="itemType">Object (details below)</pre>
        <p>The drag'n'drop configuration object.</p>

        <div class="emphasis">
            Defaults to :
            <syntax-highlight>{ parent.default }</syntax-highlight>
        </div>


        <p>Tip: for mobile drag'n'drop, use a <em><a target="_blank" rel="noopener noreferrer" href="https://github.com/Bernardo-Castilho/dragdroptouch">polyfill</a></em>.</p>

        <syntax-highlight>{ parent.code }</syntax-highlight>

        <p>Example of a draggable tree associated with a droppable tree :</p>

        <DragTree />
        <DropTree />

        <syntax-highlight>{ parent.dragdroptrees }</syntax-highlight>
    </div>

    <script>
        this.default = `
            dragndrop: {
                draggable: false, // make items draggable
                droppable: false, // make the tree droppable
                drag:      null,  // action to perform on drag
                over:      null,  // hook on dragover
                enter:     null,  // hook on dragenter
                leave:     null,  // hook on dragleave
                drop:      null,  // action to perform on drop
                cancel:    null,  // action to perform on cancellation
                guard:     null   // prevents dragover and drop
            }
        `

        this.code = `
            /* [Drag'n'drop presets](https://github.com/elbywan/bosket/blob/master/src/core/dragndrop.js) */

            <TreeView /* ... */ dragndrop={ dragndrop }/>

            <script>
                this.dragndrop = {
                    // To drag or drop on specific items
                    // you can use a function : (item) => true/false
                    draggable: true,
                    droppable: true,

                    // target       -> the model item targeted by the event
                    // event        -> the dragndrop event
                    // inputs       -> props of the component where the event is triggered

                    drag: (target, event, inputs) => {
                        /* ... */
                    },
                    over: (target, event, inputs) => {
                        /* ... */
                    },
                    enter: (target, event, inputs) => {
                        /* ... */
                    },
                    leave: (target, event, inputs) => {
                        /* ... */
                    },
                    drop: (target, event, inputs) => {
                        /* ... */
                    },
                    cancel: (target, event, inputs) => {
                        /* ... */
                    },
                    guard: (target, event, inputs) => {
                        /* ... */
                    }
                }
            <\/script>
        `

        this.dragdroptrees = `
            <DragTree>
                <div class="tree-sample">
                    <TreeView opts={ conf } />
                </div>
                <script>
                    import { dragndrop } from "@bosket/core"
                    this.dragModel = [
                        { name: "< Drag these items >" },
                        { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
                        { name: 2, children: [{ name: 21 }, { name: 22 }]},
                        { name: 3 },
                        { name: 4 }
                    ]
                    this.conf = {
                        model: this.dragModel,
                        category: "children",
                        selection: [],
                        onselection: _ => this.update({ selection: _ }),
                        display: i => i.name,
                        strategies: { fold: [() => false]},
                        // Pluck preset
                        dragndrop: { ...dragndrop.pluck(() => this.conf.model, m => { this.conf.model = m; this.update() }) }
                    }
                <\/script>
            </DragTree>

            <DropTree>
                <div class="tree-sample">
                    <TreeView opts={ conf } />
                </div>
                <script>
                    import { dragndrop } from "@bosket/core"
                    this.conf = {
                        model: [{ name: "< Drop items here >", children: []}],
                        category: "children",
                        selection: [],
                        onselection: _ => this.update({ selection: _ }),
                        display: i => i.name,
                        strategies: { fold: [() => false]},
                        // Paste preset + only drop on items with children
                        dragndrop: {
                            ...dragndrop.paste(() => this.conf.model, m => { this.conf.model = m; this.update() }),
                            droppable: item => item && item.children
                        }
                    }
                <\/script>
            </DropTree>
        `
    </script>
</dragndrop-prop>

<DragTree>
    <div class="tree-sample">
        <TreeView opts={ conf } />
    </div>
    <script>
        import { dragndrop } from "@bosket/core"
        this.dragModel = [
            { name: "< Drag these items >" },
            { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
            { name: 2, children: [{ name: 21 }, { name: 22 }]},
            { name: 3 },
            { name: 4 }
        ]
        this.conf = {
            model: this.dragModel,
            category: "children",
            selection: [],
            onselection: _ => this.update({ selection: _ }),
            display: i => i.name,
            strategies: { fold: [() => false]},
            // Pluck preset
            dragndrop: { ...dragndrop.pluck(() => this.conf.model, m => { this.conf.model = m; this.update() }) }
        }
    </script>
</DragTree>

<DropTree>
    <div class="tree-sample">
        <TreeView opts={ conf } />
    </div>
    <script>
        import { dragndrop } from "@bosket/core"
        this.conf = {
            model: [{ name: "< Drop items here >", children: []}],
            category: "children",
            selection: [],
            onselection: _ => this.update({ selection: _ }),
            display: i => i.name,
            strategies: { fold: [() => false]},
            // Paste preset + only drop on items with children
            dragndrop: {
                ...dragndrop.paste(() => this.conf.model, m => { this.conf.model = m; this.update() }),
                droppable: item => item && item.children
            }
        }
    </script>
</DropTree>

<noopener-prop>
    <div class="marged">
        <pre class="itemType">boolean</pre>
        <p>Hides the opener, which is usually the little arrow or arrow-like icon used to unfold a node.</p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>
    <script>
        this.code = `<TreeView /* ... */ noopener={ true } />`
    </script>
</noopener-prop>

<labels-prop>
    <div class="marged">
        <pre class="itemType">Object</pre>
        <p>Labels override.</p>
        <div class="emphasis">
            Defaults to :
            <syntax-highlight>{ parent.default }</syntax-highlight>
        </div>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.default = `
            labels: {
                "search.placeholder": "Search ..."
            }
        `
        this.code = `
            <TreeView /* ... */ labels={ labels } />

            <script>
                this.labels = {
                    "search.placeholder": "I am the text displayed in the search bar as a placeholder."
                }
            <\/script>
        `
    </script>
</labels-prop>

<css-prop>
    <div class="marged">
        <pre class="itemType">Object</pre>
        <p>Css classnames override.</p>
        <div class="emphasis">
            Defaults to :
            <syntax-highlight>{ parent.default }</syntax-highlight>
        </div>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.default = `
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
            }
        `
        this.code = `
            <TreeView /* ... */ css={ css } />

            <script>
                this.css = { TreeView: "CustomTree", loading: "customLoading" }
            <\/script>
        `
    </script>
</css-prop>

<transition-prop>
    <div class="marged">
        <pre class="itemType">Object</pre>
        <p>
            Allows transitions by <em><a href="https://github.com/elbywan/bosket/blob/master/src/riot/mixins/transition.js">applying css classes on mount/unmount</a></em>.<br>
        </p>

        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ transition={ transition } />

            <style>
                .TransitionName {
                    transition: opacity .3s;
                }
                .TransitionName-mount, .TransitionName-unmount {
                    opacity: 0;
                }
            </style>
            <script>
                /*
                    During the whole life of the tree, the "TransitionName" css class
                        is set on the element.
                    On mount the  "TransitionName-mount" css class is applied,
                        then removed next tick.
                    On unmount the  "TransitionName-unmount" css class is applied,
                        and the node destruction is delayed until the transition completes.
                 */
                this.transition = {
                     name: "TransitionName"
                }
            <\/script>
        `
    </script>
</transition-prop>
