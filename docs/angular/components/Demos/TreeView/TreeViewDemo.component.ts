import { Component, Input, Output, EventEmitter } from "@angular/core"

// Css style
import "./TreeViewDemo.css"

// Data model
import initialModel from "self/common/models/TreeViewModel"

// Bosket imports
import { DisplayComponent } from "@bosket/angular"
import { dragndrop } from "@bosket/core"

@Component({
    selector: "treeview-demo",
    template: `
        <!-- We render the TreeView here -->
        <TreeView
            [model]="model"
            [category]="category"
            [(selection)]="selection"
            [sort]="sort"
            [key]="key"
            [search]="search"
            [strategies]="strategies"
            [dragndrop]="dragndrop"
            [displayComponent]="displayComponent"
            [css]="css"
            (onDrop)="onDrop($event)"
            (onDrag)="onDrag($event)">
        </TreeView>`
})
export class TreeViewDemo {

    // Load the drag image once on component creation
    private dragImage: HTMLImageElement
    constructor(){
        this.dragImage = new Image()
        this.dragImage.src = "../assets/drag-image.png"
    }

    // Model mapping
    model: Object[] = initialModel
    // Each object of the model has a property "items" containing the children
    category = "items"
    // We enhance the ouput by passing a custom component which will wrap items
    displayComponent = ItemDisplay
    // Unique identifier used by angular to "track" changes on list updates
    key = (index, item) => item.label
    // The sorting function
    sort = (a, b) => a.label.localeCompare(b.label)
    // Enables the search bar + defines the search algorithm
    search = input => i => i.label.match(new RegExp(`.*${ input }.*`, "gi"))
    // The selected items list, which is here defined in the parent component (hence the double binding)
    @Input()
    get selection() { return this._selection }
    set selection(s) { this._selection = s; this.selectionChange.emit(s) }
    private _selection = []
    @Output() selectionChange = new EventEmitter<any>()
    strategies = {
        // Strategies performed on click, selection & fold
        // select on click
        click: ["select"],
        // "modifiers" means that we single/multi select depending on which keyboard modifiers are active
        selection: ["modifiers"],
        // "opener-control" allows the opener arrow to control the folding
        fold: ["opener-control"]
    }
    // Customize css class
    css = { TreeView: "TreeViewDemo" }
    // Drag'n'drop configuration
    dragndrop = {
        // Uses the "selection" preset (drag/drop the selected item(s))
        ...dragndrop.selection(() => this.model, m => this.model = m),
        // Restrain the drop zone to nodes with children only (and root node)
        droppable: _ => !_ || _.items && _.items instanceof Array
    }
    onDrop = ({target, event, inputs}) => this.dragndrop.drop(target, event, inputs)
    onDrag = ({target, event, inputs}) => {
        event.dataTransfer.setDragImage(this.dragImage, 0, 0)
        event.dataTransfer.setData("application/json", JSON.stringify(this.selection))
    }
}

// This component wraps items within an anchor tag
@Component({
    template:`<a>{{ item.label }}</a>`
})
export class ItemDisplay implements DisplayComponent<{ label }> {
    // Injected item
    @Input() item : { label }
}
