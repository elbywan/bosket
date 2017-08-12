import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">Object[]</pre>
            <p>
                Pass an array which will automatically (if double-binded) be updated when the selected item(s) change.
            </p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class SelectionProp {
    code = `
        const selection = []

        <TreeView /* ... */ [(selection)]="selection"></TreeView>
    `
}
