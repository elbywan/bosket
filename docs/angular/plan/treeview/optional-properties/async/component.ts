import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">(any => Promise&lt;Object[]&gt;) => Promise&lt;Object[]&gt;</pre>
            <p>A function used to unwrap <em><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise" target="_blank" rel="noopener noreferrer">Promises</a></em> in case of asynchronous children.</p>

            <div class="emphasis">
                Defaults to simple method call :
                <syntax-highlight language="typescript">_ => _()</syntax-highlight>
            </div>

            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class AsyncProp {
    code = `
        const model = [{
            label: "Asynchronous children",
            children: timer =>
                new Promise(resolve =>
                    setTimeout(() =>
                        resolve([{ label: "timer is provided by the async property" }]), timer))
        }]

        const async = _ => _(Math.random() * 1000 + 500)

        <TreeView /* ... */ [async]="async" [model]="model"></TreeView>
    `
}
