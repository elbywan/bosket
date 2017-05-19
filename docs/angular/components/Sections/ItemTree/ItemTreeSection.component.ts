import { Component, Input } from "@angular/core"
import { ItemComponent } from "../../../../../src/angular"

import "./ItemTreeSection.css"

const timeoutPromise = (value, duration) => new Promise(resolve => setTimeout(() => resolve(value), duration))
const tree = require("../../../../../src/tools/trees").tree

@Component({
    template:`<a>{{ item.label }}</a>`
})
export class ItemDisplay implements ItemComponent<{ label }> {
    @Input() item : { label }
}

@Component({
    selector: "itemtree-section",
    template: `
     <component-section componentName="ItemTree" description="Powerful tree of nested objects.">

        <div class="inline-row">
            <ItemTree
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
                (onDrop)="onDrop($event[0], $event[1])">
            </ItemTree>
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
export class ItemTreeSection {
    model = [
        {
            label: "Vegetables",
            items: [
                { label: "Potato" },
                { label: "Carrot" },
                { label: "Tomato" }
            ]
        },
        {
            label: "Fruits",
            items: [
                { label: "Orange" },
                { label: "Watermelon" },
                { label: "Banana" },
                { label: "Kumquat" },
                { label: "Strawberry" },
                { label: "Raspberry" },
                { label: "Cherry" }
            ]
        },
        {
            label: "Animals",
            items: [
                {
                    label: "Mammals",
                    items: [
                        { label: "Tiger" },
                        { label: "Platypus" },
                        { label: "Bear" }
                    ]
                },
                {
                    label: "Reptiles",
                    items: [
                        { label: "Turtle" },
                        { label: "Crocodile" }
                    ]
                },
                {
                    label: "Insects",
                    items: [
                        { label: "Bee" },
                        { label: "Fly" },
                        { label: "Ant" }
                    ]
                }
            ]
        },
        {
            label: "Durations",
            items: () => timeoutPromise([
                { label: "0.5 second",  items: () => timeoutPromise([{ label: "Brief" }], 500) },
                { label: "2 seconds",   items: () => timeoutPromise([{ label: "Enduring" }], 2000) },
                { label: "4 seconds",   items: () => timeoutPromise([{ label: "Everlasting" }], 4000) }
            ], 1000)
        }
    ]

    category = "items"
    display = item => item.label
    sort = (a, b) => a.label.localeCompare(b.label)
    key = (index, item) => item.label
    search = input => i => i.label.match(new RegExp(`.*${ input }.*`, "gi"))
    // disabled = item => item.items
    selection = []
    deselect = item => this.selection = this.selection.filter(i => i !== item)
    onSelect = items => this.selection = items
    /*
    transition = {
        transitionName: "ItemTreeTransition",
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300
    }
    */
    strategies = {
        selection: ["modifiers"],
        click: ["unfold-on-selection"],
        fold: ["opener-control"]
    }
    noOpener = false
    dragndrop = {
        draggable: true,
        droppable: true
    }
    onDrop = (target, item) => {
        let updatedModel = tree(this.model, this.category).filter(e => this.selection.indexOf(e) < 0)
        if(target)
            target[this.category] = [ ...target[this.category], ...this.selection ]
        else
            updatedModel = [ ...updatedModel, ...this.selection ]

        this.model = updatedModel
    }
    itemComponent = ItemDisplay
}