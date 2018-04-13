import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ '{ position: "none" | "left" | "right", callback: (item, folded) => void }' }}</pre>
            <p>
                A collection of options used to configure the opener, which is usually the little arrow or arrow-like icon used to unfold a node..<br/>
                <br/>
                <strong>position</strong> : Positions the opener.<br/>
                <strong>callback</strong> : Perform a callback when an opener is activated.
            </p>
            <div class="emphasis">Defaults to "right"</div>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OpenerOptsProp {
    code = `
        const onFold = (item, folded) => {
            console.log(\`\${item} is now \${folded ? 'folded' : 'unfolded'}\`)
        }

        <TreeView
            /* ... */
            [openerOpts]="onFold"
        ></TreeView>
    `
}
