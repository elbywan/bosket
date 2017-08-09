// @flow

import React from "react"
import { jscode } from "self/react/tools"

export default {
    title: "strategies",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/treeview/optional-properties/strategies/index.js",
    content:
        <div className="marged">
            <pre className="itemType">{"{"} selection: string | selectionStrategy, click: string | clickStrategy, fold: string | foldStrategy }</pre>
            <p>
                <em>Strategies determine the action(s) to perform on click, fold or selection.</em><br/><br/>
                The <em>strategies prop</em> is an object containing 3 properties (click, fold, selection). Each property value is an array of strategies.<br/>
                A <em>strategy</em> is either a string (containing a predefined strategy name), or a function (executed in the tree context).<br/><br/>
                In case of multiple strategies, they are chained.
            </p>

            <pre className="itemType">selectionStrategy: (item: Object, selection: Object[], neighbours: Object[], ancestors: Object[]) => Object[]</pre>
            <pre className="itemType">clickStrategy: (item: Object, event: MouseEvent, ancestors: Object[], neighbours: Object[]) => void</pre>
            <pre className="itemType">foldStrategy: (item: Object, folded: boolean) => boolean</pre>

            <div className="emphasis">
                Defaults to : { jscode`
                {
                    // One item selected at a time
                    selection: ["single"],
                    // No click callbacks
                    click: [],
                    // Folds an item when itself or its children are not selected
                    fold: [ "not-selected", "no-child-selection" ]
                }`}
            </div>

            { jscode`
            // The object is mixed in with the default properties, so you can override only the keys you want.
            const strategies = {
                // Select only the items beginning with the letter a
                selection: ["multiple", (item, selection) => selection.filter(elt => elt.label.charAt(0) === 'a' )]
                click: ["unfold-on-selection"],
                fold: ["opener-control", "no-child-selection"]
            }

            <TreeView /* ... */ strategies={ strategies }></TreeView>` }

            <p>Check the <em><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js" target="_blank" rel="noopener noreferrer">strategies.js file</a></em> for the list of available strategies and descriptions.</p>
        </div>
}
