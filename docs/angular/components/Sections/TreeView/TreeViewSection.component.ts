import { Component, Input } from "@angular/core"
import { ItemComponent } from "bosket/angular"

import "./TreeViewSection.css"
import initialModel from "../../../../common/models/TreeViewModel"
import { dragndrop } from "bosket/core/dragndrop"

const timeoutPromise = (value, duration) => new Promise(resolve => setTimeout(() => resolve(value), duration))


@Component({
    template:`<a>{{ item.label }}</a>`
})
export class ItemDisplay implements ItemComponent<{ label }> {
    @Input() item : { label }
}

@Component({
    selector: "treeview-section",
    template: `
     <component-section componentName="TreeView" description="Powerful tree of nested objects.">

        <div class="inline-row">
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
                [itemComponent]="itemComponent"
                [css]="css"
                (onDrop)="onDrop($event[0], $event[1])"
                (onDrag)="onDrag($event)">
            </TreeView>
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

        </component-section>
    `,
    styles: [`
    `]
})
export class TreeViewSection {

    constructor(){
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.svg"
    }

    model = initialModel

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
        draggable: true,
        droppable: true
    }
    css = { TreeView: "TreeViewDemo" }
    dragImage: HTMLImageElement
    onDrop = (target, item) => {
        this.model = dragndrop.drops.selection(target, this.model, this.category, this.selection)
    }
    onDrag = ({target, event, ancestors, neighbours}) => {
        event.dataTransfer.setDragImage(this.dragImage, 0, 0)
    }
    itemComponent = ItemDisplay
}