import React from "react"

import { jscode, tscode } from "../../../../tools/tools"

export default {
    title: "Optional props",
    subs: [
        {
            title: "display",
            content:
                <div className="marged">
                    <p>
                        A custom rendering function.
                    </p>
                    <div className="emphasis">
                        Defaults to the&nbsp;
                        <em><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" target="_blank" rel="noopener noreferrer">toString</a></em>&nbsp;
                        function.

                        { jscode`
                            display: _ => _.toString()` }
                    </div>
                    { jscode`
                    // The display function is run for every item in the model
                    // Here we wrap the items in an anchor, display the label property and add an extra exclamation mark.
                    const display =  (item, ancestors) =>
                        <a href={ item.link }>{ item.label } !</a>

                    <TreeView
                        /* ... */
                        display={ display }>
                    </TreeView>` }
                </div>
        },
        {
            title: "key",
            content:
                <div className="marged">
                    <p>
                        A function returning a unique&nbsp;
                        <em><a href="https://facebook.github.io/react/docs/lists-and-keys.html#keys" target="_blank" rel="noopener noreferrer">key</a></em>&nbsp;
                        used by React to perform list updates.<br/>
                    </p>
                    <div className="emphasis">
                         Defaults to the index of the item in the list.
                    </div>
                    { jscode`
                    const key = item => item.id

                    <TreeView /* ... */ key={ key }></TreeView>` }
                </div>
        },
        {
            title: "strategies",
            content:
                <div className="marged">
                    <p>
                        <em>Strategies determine the action(s) to perform on click, fold or selection.</em><br/><br/>
                        The <em>strategies prop</em> is an object containing 3 properties (click, fold, selection). Each property value is an array of strategies.<br/>
                        A <em>strategy</em> is either a string (containing a predefined strategy name), or a function (executed in the tree context).<br/><br/>
                        In case of multiple strategies, they are chained.
                    </p>
                    { jscode`
                    // The object is mixed in with the default properties, so you can override only the keys you want.
                    const strategies = {
                        // Select only the items beginning with the letter a
                        selection: ["multiple", (item, selection) => selection.filter(elt => elt.label.charAt(0) === 'a' )]
                        click: ["unfold-on-selection"],
                        fold: ["opener-control", "no-child-selection"]
                    }

                    <TreeView /* ... */ strategies={ strategies }></TreeView>` }
                    <ol className="chapter-list">
                        <li>
                            <h5>Selection strategies</h5>
                            <p>
                                Selection strategies create the <em><a href="#Components#TreeView#Required props#selection">selection</a></em> based on the previous value and the newly selected item.
                            </p>

                            { tscode`
                                // item         -> clicked item
                                // selection    -> list of currently selected items, may have been modified by other selection strategies
                                // neighbours   -> the neighbours of the clicked item
                                // ancestors    -> the clicked item ancestors
                                // ---------------
                                // returns      -> the new selection array, which is then passed to the next selection strategy (if multiple strategies are passed)

                                type selectionStrategy<Item extends Object> = (item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>` }

                            <h6>Predefined</h6>

                            <div className="emphasis">
                                Defaults to : {jscode`["single"]`}
                            </div>

                            <p>
                                <em>single</em><br/><br/>
                                The single strategy allows only one selected item at a time (usually the last item clicked).
                            </p>
                            <p>
                                <em>multiple</em><br/><br/>
                                The multiple strategy allows any number of selected items at a time, and will add the last item clicked to the selection list.
                            </p>
                            <p>
                                <em>modifiers</em><br/><br/>
                                The modifiers strategy is the way most file explorers behave.<br/>
                                Without keyboard modifiers, only one selected item is allowed.
                                While pressing the shift key, all items between the two last selected are added to the selection array.
                                While pressing the ctrl (or cmd for mac users) key, the clicked item is added to the selection list.
                            </p>
                            <p>
                                <em>ancestors</em><br/><br/>
                                Selects the clicked item and all its ancestors.
                            </p>

                        </li>
                        <li>
                            <h5>Click strategies</h5>

                            <p>
                                Click strategies are simply callbacks performed on an item click.
                            </p>

                            { tscode`
                                // item         -> click item
                                // event        -> original mouse event
                                // ancestors    -> the clicked item ancestors
                                // neighbours   -> the neighbours of the clicked item

                                type clickStrategy<Item extends Object> = (item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void` }

                            <h6>Predefined</h6>

                            <div className="emphasis">
                                Defaults to no click strategies : {jscode`[]`}
                            </div>

                            <p>
                                <em>unfold-on-selection</em><br/><br/>
                                Unfold an item when selecting it. Pair it with the "opener-control" fold strategy.
                            </p>
                            <p>
                                <em>toggle-fold</em><br/><br/>
                                Toggle fold/unfold. Pair it with the "opener-control" fold strategy.
                            </p>
                        </li>
                        <li>
                            <h5>Fold strategies</h5>

                            <p>
                                Fold strategies determine if an item will be folded or not, meaning if its children are hidden.
                            </p>

                            { tscode`
                                // item      -> item to be considered
                                // folded -> the fold state, chained between the fold strategies
                                // ------------
                                // returns   -> true if the item should be folded, false otherwise

                                type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean`}

                            <h6>Predefined</h6>

                            <div className="emphasis">
                                Defaults to : { jscode`[ "not-selected", "no-child-selection" ]` }
                            </div>

                            <p>
                                <em>opener-control</em><br/><br/>
                                Allow the opener (usually an arrow-like element) to control the fold state.
                            </p>
                            <p>
                                <em>not-selected</em><br/><br/>
                                Fold when not selected.
                            </p>
                            <p>
                                <em>no-child-selection</em><br/><br/>
                                Unfold as long as there is at least one child selected.
                            </p>
                            <p>
                                <em>max-depth</em><br/><br/>
                                Fold every item deeper than then "max-depth" component property.
                            </p>

                        </li>
                    </ol>
                </div>
        },
        {
            title: "sort",
            content:
                <div className="marged">
                    <p>A custom sorting function.</p>
                    { jscode`
                        const sort = (a, b) => a.label.localeCompare(b.label)

                        <TreeView /* ... */ sort={ sort }></TreeView>` }
                </div>
        },
        {
            title: "disabled",
            content:
                <div className="marged">
                    <p>A disable function, which prevents selection and apply the css 'disabled'' class.</p>
                    { jscode`
                        // Disable elements having children
                        const disabled = item => !!item.children

                        <TreeView /* ... */ disabled={ disabled }></TreeView>` }
                </div>
        },
        {
            title: "search",
            content:
                <div className="marged">
                    <p>A search function which enables the built-in search bar.</p>
                    { jscode`
                        const search = input => item => item.label.match(new RegExp(\`.*\${ input }.*\`, "gi"))

                        <TreeView /* ... */ search={ search }></TreeView>` }
                </div>
        },
        {
            title: "async",
            content:
                <div className="marged">
                    <p>A function used to unwrap <em><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise" target="_blank" rel="noopener noreferrer">Promises</a></em> in case of asynchronous children.</p>

                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            _ => _()` }
                    </div>

                    { jscode`
                        const model = [{
                            label: "Asynchronous children",
                            children: timer =>
                                 new Promise(resolve =>
                                    setTimeout(() =>
                                        resolve([{ label: "timer is provided by the async property" }]), timer))
                        }]

                        const async = _ => _(1000)

                        <TreeView /* ... */ async={ async } model={ model }></TreeView>` }
                </div>
        },
        {
            title: "dragndrop",
            content:
                <div className="marged">
                    <p>The drag'n'drop configuration object.</p>

                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            dragndrop: {
                                draggable: false, // make items draggable
                                droppable: false, // make the tree droppable
                                drag: null,       // action to perform on drag - not mandatory
                                drop: null        // action to perform on drop - mandatory if droppable is set to true
                            }` }
                    </div>

                    { jscode`
                        /* [Drag'n'drop utility methods](https://github.com/elbywan/bosket/blob/master/src/core/dragndrop.js) */
                        import { dragndrop } from "bosket/core/dragndrop"

                        /* ... */

                        state = {
                            model: /* ... */,
                            selection: /* ... */
                        }

                        dragndrop = {
                            draggable: true,
                            droppable: true,

                            // target       -> item dragged
                            // event        -> original drag event
                            // ancestors    -> ancestors of the dragged item
                            // neighbours   -> neighbours of the dragged item
                            drag: (target, event, ancestors, neighbours) => {
                                // Set custom drag image
                                event.dataTransfer.setDragImage("myimage.jpg", 0, 0)
                            },

                            // target       -> item on which the drop occured
                            // item         -> the item which is dropped
                            // event        -> original drag event
                            drop: (target, item, event) => {
                                // ["standard" drop, should be convenient for most use cases](https://github.com/elbywan/bosket/blob/master/src/core/dragndrop.js#L6)
                                this.setState({
                                    model: dragndrop.drops.selection(
                                        target,
                                        this.state.model,
                                        "category",
                                        this.state.selection)
                                })
                            }
                        }

                        <TreeView /* ... */ dragndrop={ this.dragndrop }></TreeView>`}
                </div>
        },
        {
            title: "noOpener",
            content:
                <div className="marged">
                    <p>Hides the opener.</p>
                    { jscode`
                        <TreeView /* ... */ noOpener="true"></TreeView>` }
                </div>
        },
        {
            title: "labels",
            content:
                <div className="marged">
                    <p>Labels override.</p>
                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            labels: {
                                "search.placeholder": "Search ..."
                            } `}
                    </div>
                    { jscode`
                        const labels = {
                            "search.placeholder": "I am the text displayed in the search bar as a placeholder."
                        }

                        <TreeView /* ... */ labels={ labels }></TreeView>` }
                </div>
        },
        {
            title: "css",
            content:
                <div className="marged">
                    <p>Css classnames overrides.</p>
                    <div className="emphasis">
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
                            } `}
                    </div>
                    { jscode`
                        const css = { TreeView: "CustomTree", loading: "customLoading" }

                        <TreeView /* ... */ css={ css }></TreeView>
                    `}
                </div>
        },
        {
            title: "transition",
            content:
                <div className="marged">
                    <p>Creation / destruction transitions using <em><a href="https://github.com/reactjs/react-transition-group" target="_blank" rel="noopener noreferrer">react-transition-group</a></em>.</p>

                    { jscode`
                        transition: {
                            transitionName: "TransitionClassName",
                            transitionEnterTimeout: 300,
                            transitionLeaveTimeout: 300
                        }

                        <TreeView /* ... */ transition={ transition }></TreeView>` }
                </div>
        }
    ]
}