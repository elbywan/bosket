import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">(query: string) => (item: Object) => boolean</pre>
            <p>If provided, enables the built-in search bar and is called when the user types a search query.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class SearchProp {
    code = `
        const search = input => item => item.label.match(new RegExp(\`.*\${ input }.*\`, "gi"))

        <TreeView /* ... */ search={ search }></TreeView>`
}
