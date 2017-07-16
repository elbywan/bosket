// @flow

import React from "react"
import { jscode, tscode } from "self/react/tools"

export default {
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
            <ul className="chapter-list">
                <li>
                    <h5><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js#L30" target="_blank" rel="noopener noreferrer">Selection strategies</a></h5>
                    <p>
                        Selection strategies update the <em><a href="#TreeView#Required props#selection">selection</a></em> property based on the previous value and the newly selected item(s).
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
                        The single strategy allows only one selected item at the same time (usually the last item clicked).
                    </p>
                    <p>
                        <em>multiple</em><br/><br/>
                        The multiple strategy allows any number of selected items and will add the last item clicked to the selection list.
                    </p>
                    <p>
                        <em>modifiers</em><br/><br/>
                        The modifiers strategy is the way most file explorers behave.<br/>
                        Without keyboard modifiers, only one selected item is allowed.
                        While pressing the shift key, all items between the two last selected siblings are added to the selection array.
                        While pressing the ctrl (or cmd for mac users) key, the item is added to the selection list.
                    </p>
                    <p>
                        <em>ancestors</em><br/><br/>
                        Selects an item and all its ancestors.
                    </p>

                </li>
                <li>
                    <h5><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js#L89" target="_blank" rel="noopener noreferrer">Click strategies</a></h5>

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
                    <h5><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js#L107" target="_blank" rel="noopener noreferrer">Fold strategies</a></h5>

                    <p>
                        Fold strategies determine if an item will be folded or not, meaning if its children are hidden.
                    </p>

                    { tscode`
                        // item      -> item to be considered
                        // folded -> the fold state, chained between the fold strategies
                        // ------------
                        // returns   -> true if the item should be folded, false otherwise

                        type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean
                    ` }

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
            </ul>
        </div>
}
