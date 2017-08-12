import { Component } from "@angular/core"
import { indent } from "self/common/tools"

@Component({
    template: `
         <div class="marged">
            <pre class="itemType">{{ itemType }}</pre>
            <p>
                <em>Strategies determine the action(s) to perform on click, fold or selection.</em><br/><br/>
                The <em>strategies prop</em> is an object containing 3 properties (click, fold, selection). Each property value is an array of strategies.<br/>
                A <em>strategy</em> is either a string (containing a predefined strategy name), or a function (executed in the tree context).<br/><br/>
                In case of multiple strategies, they are chained.
            </p>

            <syntax-highlight language="typescript">{{ types }}</syntax-highlight>

            <div class="emphasis">
                Defaults to : <syntax-highlight language="typescript">{{ defaultsCode }}</syntax-highlight>
            </div>

            <syntax-highlight language="typescript">{{ sampleCode }}</syntax-highlight>

            <p>Check the <em><a href="https://github.com/elbywan/bosket/blob/master/src/core/strategies.js" target="_blank" rel="noopener noreferrer">strategies.js file</a></em> for the list of available strategies and descriptions.</p>
        </div>
    `
})
export class StrategiesProp {
    itemType = indent`
        {
            selection: (string | selectionStrategy)[],
            click: (string | clickStrategy)[],
            fold: (string | foldStrategy)[]
        }
    `

    types = `
        type selectionStrategy<Item extends Object> = (item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>
        type clickStrategy<Item extends Object> = (item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void
        type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean
    `

    defaultsCode = `
        {
            // One item selected at a time
            selection: ["single"],
            // No click callbacks
            click: [],
            // Folds an item when itself or its children are not selected
            fold: [ "not-selected", "no-child-selection" ]
        }`

    sampleCode = `
        // The object is mixed in with the default properties, so you can override only the keys you want.
        const strategies = {
            // Select only the items beginning with the letter a
            selection: ["multiple", (item, selection) => selection.filter(elt => elt.label.charAt(0) === 'a' )]
            click: ["unfold-on-selection"],
            fold: ["opener-control", "no-child-selection"]
        }

        <TreeView /* ... */ [strategies]="strategies"></TreeView>`
}
