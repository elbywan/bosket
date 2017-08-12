import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">(index: number, item: Item) => string</pre>
            <p>
                A function returning a unique key used by Angular to <em><a href="https://angular.io/guide/template-syntax#ngfor-with-trackby" target="_blank" rel="noopener noreferrer">track changes</a></em> on list updates.<br/>
            </p>
            <div class="emphasis">
                 If not provided, defaults to the index of the item in the list.
            </div>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class KeyProp {
    code = `
        const key = item => item.id

        <TreeView /* ... */ key={ key }></TreeView>`
}
