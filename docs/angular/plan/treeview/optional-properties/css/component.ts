import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">Object</pre>
            <p>Css classs overrides.</p>
            <div class="emphasis">
                Defaults to :
                <syntax-highlight language="typescript">{{ defaultsCode }}</syntax-highlight>
            </div>
            <syntax-highlight language="typescript">{{ sampleCode }}</syntax-highlight>
        </div>
    `
})
export class CssProp {
    defaultsCode = `
        css: {
            TreeView:           "TreeView",
            opener:             "opener",
            depth:              "depth",
            selected:           "selected",
            category:           "category",
            folded:             "folded",
            disabled:           "disabled",
            async:              "async",
            loading:            "loading",
            nodrop:             "nodrop",
            dragover:           "dragover",
            search:             "search",
            item:               "item"
        }
    `
    sampleCode = `
        const css = { TreeView: "CustomTree", loading: "customLoading" }

        <TreeView /* ... */ [css]="css"></TreeView>
    `
}
