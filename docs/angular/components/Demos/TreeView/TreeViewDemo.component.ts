import { Component, Input } from "@angular/core"
import { DisplayComponent } from "bosket/angular"

import "./TreeViewDemo.css"
import initialModel from "self/common/models/TreeViewModel"
import { dragndrop } from "bosket/core/dragndrop"

@Component({
    template:`<a>{{ item.label }}</a>`
})
export class ItemDisplay implements DisplayComponent<{ label }> {
    @Input() item : { label }
}

@Component({
    selector: "treeview-demo",
    template: `
     <ComponentDemo componentName="TreeView" description="Powerful tree of nested objects." [files]="files" style="text-align: center">

        <div class="inline-row">
            <div style="text-align: left">
                <TreeView
                    [model]="model"
                    [category]="category"
                    [(selection)]="selection"
                    [display]="display"
                    [sort]="sort"
                    [key]="key"
                    [search]="search"
                    [strategies]="strategies"
                    [noOpener]="noOpener"
                    [dragndrop]="dragndrop"
                    [displayComponent]="displayComponent"
                    [css]="css"
                    (onDrop)="onDrop($event)"
                    (onDrag)="onDrag($event)">
                </TreeView>
            </div>
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

    </ComponentDemo>`,
    styles: []
})
export class TreeViewDemo {

    constructor(){
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"
    }

    files=[
        "./components/Demos/TreeView/TreeViewDemo.component.ts",
        "./components/Demos/TreeView/TreeViewDemo.css",
        "../common/models/TreeViewModel.js"
    ]

    model: Object[] = initialModel

    category = "items"
    display = item => item.label
    sort = (a, b) => a.label.localeCompare(b.label)
    key = (index, item) => item.label
    search = input => i => i.label.match(new RegExp(`.*${ input }.*`, "gi"))
    selection = []
    deselect = item => this.selection = this.selection.filter(i => i !== item)
    strategies = {
        selection: ["modifiers"],
        click: [],
        fold: ["opener-control"]
    }
    noOpener = false
    dragndrop = {
        ...dragndrop.selection(() => this.model, m => this.model = m),
        droppable: _ => !_ || _.items && _.items instanceof Array
    }
    css = { TreeView: "TreeViewDemo" }
    dragImage: HTMLImageElement
    onDrop = ({target, event, inputs}) => this.dragndrop.drop(target, event, inputs)
    onDrag = ({target, event, inputs}) => {
        event.dataTransfer.setDragImage(this.dragImage, 0, 0)
        event.dataTransfer.setData("application/json", JSON.stringify(this.selection))
    }
    displayComponent = ItemDisplay
}
