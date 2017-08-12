import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">(item1, item2) => boolean</pre>
            <p>A custom sorting function.</p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class SortProp {
    code = `
        const sort = (a, b) => a.label.localeCompare(b.label)

        <TreeView /* ... */ [sort]="sort"></TreeView>`
}
