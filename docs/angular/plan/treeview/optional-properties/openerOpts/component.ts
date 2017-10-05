import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ '{ position: "none" | "left" | "right" }' }}</pre>
            <p>Positions the opener, which is usually the little arrow or arrow-like icon used to unfold a node.</p>
            <div class="emphasis">Defaults to "right"</div>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OpenerOptsProp {
    code = `<TreeView /* ... */ [openerOpts]="{ position: 'left' }"></TreeView>`
}
