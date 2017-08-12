import { Component } from "@angular/core"

@Component({
    template: `
    <div class="marged">
        <pre class="itemType">(item: Object) => boolean</pre>
        <p>Disables elements based on the result of the provided function, which prevents selection and apply the css 'disabled' class.</p>
        <syntax-highlight language="typescript">{{ code }} </syntax-highlight>
    </div>
    `
})
export class DisabledProp {
    code = `
        // Disable elements having children
        const disabled = item => !item.children

        <TreeView /* ... */ [disabled]="disabled"></TreeView>`
}
