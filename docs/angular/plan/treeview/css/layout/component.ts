import { Component } from "@angular/core"
import htmlLayout from "./html_layout"

@Component({
    template: `
        <div>
            <p>
                Below is the <em>full HTML layout</em> of a TreeView, with the <em><a href="#TreeView#Optional properties#css">default classes</a></em>.<br/>
            </p>
            <syntax-highlight language="html">{{ htmlLayout }}</syntax-highlight>
        </div>
    `
})
export class TreeViewLayout {
    htmlLayout = htmlLayout
}