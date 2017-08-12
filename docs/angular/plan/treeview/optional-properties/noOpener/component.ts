import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">boolean</pre>
            <p>Hides the opener, which is usually the little arrow or arrow-like icon used to unfold a node.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class NoOpenerProp {
    code = `<TreeView /* ... */ [noOpener]="true"></TreeView>`
}
