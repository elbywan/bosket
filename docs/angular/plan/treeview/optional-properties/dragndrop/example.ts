import { Component, Input, Output } from "@angular/core"

// Drag'n'drop presets
import { dragndrop } from "bosket/core"

const dragModel = [
    { name: "< Drag these items >" },
    { name: 1, children: [{ name: 11 }, { name: 12 }, { name: 13 }]},
    { name: 2, children: [{ name: 21 }, { name: 22 }]},
    { name: 3 },
    { name: 4 }
]

@Component({
    selector: "drag-tree",
    template: `
        <div class="tree-sample">
            <TreeView
                [model]="model"
                category="children"
                [(selection)]="selection"
                [display]="display"
                [strategies]="strategies"
                [dragndrop]="dragndrop"
                (onDrag)="onDrag($event)">
            </TreeView>
        </div>
    `
})
export class DragTree {
    pluckPreset = dragndrop.pluck(() => this.model, m => this.model = m)

    model : Object[] = dragModel
    selection = []
    display = i => i.name
    strategies = { fold: [() => false] }

    dragndrop = { draggable: this.pluckPreset.draggable }
    onDrag = ({target, event, inputs}) => this.pluckPreset.drag(target, event, inputs)
}

@Component({
    selector: "drop-tree",
    template: `
        <div class="tree-sample">
            <TreeView
                [model]="model"
                category="children"
                [(selection)]="selection"
                [display]="display"
                [strategies]="strategies"
                [dragndrop]="dragndrop"
                (onDrop)="onDrop($event)">
            </TreeView>
        </div>
    `
})
export class DropTree {
    pastePreset = dragndrop.paste(() => this.model, m => this.model = m)

    model : Object[] = [{ name: "< Drop items here >", children: []}]
    selection = []
    display = i => i.name
    strategies = { fold: [() => false] }
    dragndrop = { droppable: item => item && item.children }
    onDrop = ({target, event, inputs}) => this.pastePreset.drop(target, event, inputs)
}