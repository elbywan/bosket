import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">Object[]</pre>
            <p>
                An array of objects which is used to populate the component.<br/>
                The format is detailed in the <em><a href="#Usage#Data model">data model</a></em> section.
            </p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class ModelProp {
    code = `
        const model = [
            { label: "One" },
            { label: "Two" },
            { label: "Three", list: [
                { label: "Four" },
                { label: "Five" }
            ] }
        ]

        <TreeView /* ... */ [model]="model"></TreeView>`
}
