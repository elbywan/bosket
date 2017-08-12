import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">Object</pre>
            <p>Labels override.</p>
            <div class="emphasis">
                Defaults to :
                <syntax-highlight language="typescript">{{ defaultsCode }}</syntax-highlight>
            </div>
            <syntax-highlight language="typescript">{{ sampleCode }}</syntax-highlight>
        </div>
    `
})
export class LabelsProp {
    defaultsCode = `
        labels: {
            "search.placeholder": "Search ..."
        }`

    sampleCode = `
        const labels = {
            "search.placeholder": "I am the text displayed in the search bar as a placeholder."
        }

        <TreeView /* ... */ [labels]="labels"></TreeView>`
}
