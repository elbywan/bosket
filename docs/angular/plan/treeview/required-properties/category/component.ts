import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">string</pre>
            <p>
                The name of the property containing the children.<br/>
                In the example above, it would be "list".
            </p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class CategoryProp {
    code = `<TreeView /* ... */ category="list"></TreeView>`
}
