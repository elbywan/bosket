import { Component, Input } from "@angular/core"

@Component({
    selector: "treeview-section",
    template: `
    <div>
        <p>
            <span>Demonstrates a basic usage of the TreeView component </span>
            <span>and how to override and use most of its </span>
            <em><a href="#TreeView#Required properties">component props</a></em>, and&nbsp;
            <em><a href="#TreeView#Css">css styles</a></em>.
        </p>
        <span>Featuring :</span>
        <ul>
            <li>Drag and drop, with a custom drag image.</li>
            <li>Asynchronous children loading</li>
            <li>Multiselection using keyboard modifiers (shift / ctrl or cmd)</li>
            <li>Transitions on fold / unfold</li>
            <li>Alphabetical sort</li>
            <li>Search bar</li>
        </ul>
    </div>
    <ComponentDemo componentName="Nested items" [files]="files">
        <div style="text-align: center">
            <div style="display: inline-block; text-align: left">
                <treeview-demo [(selection)]="selection"></treeview-demo>
            </div>

            <p>
                {{
                    selection.length === 0 ? "No elements are" :
                    selection.length === 1 ? "One element is" :
                    selection.length  + " elements are"
                }} selected.
            </p>

            <div class="select-blocks">
                <button *ngFor="let item of selection" (click)="deselect(item)" >
                    {{ item.label }}
                </button>
            </div>
        </div>
    </ComponentDemo>`
})
export class TreeViewSection {

    files=[
        "./components/Demos/TreeView/TreeViewDemo.component.ts",
        "./components/Demos/TreeView/TreeViewDemo.css",
        "../common/models/TreeViewModel.js"
    ]

    selection = []
    deselect = item => this.selection = this.selection.filter(i => i !== item)

}
