import { Component } from "@angular/core"

@Component({
    template: `
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

                <syntax-highlight language="typescript">item => item.toString()</syntax-highlight>
            </div>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class DisplayProp {
    code = `
        // The display function is run for every item in the model.
        // Here, we choose to display the 'label' property in lower case.
        const display = item => item.display.toLowerCase()

        <TreeView
            /* ... */
            [display]="display">
        </TreeView>`
}
