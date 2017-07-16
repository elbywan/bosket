import { Component } from "@angular/core"

const sampleModel = [
    { label: "Click me, I'm a node with two children.", children: [
        { label: "I am a childless leaf." },
        { label: "I am a also a childless leaf." }
    ]},
    { label: "I'm a leaf, I do not have children." },
    { label: "I am an asynchronous node, click me and wait one second.", children: () =>
        new Promise(resolve =>
            setTimeout(() =>
                resolve([{ label: "It took exactly one second to fetch me the first time, I am cached afterwards." }]), 1000))
    }
]

@Component({
    selector: "data-model-tree",
    template: `
        <TreeView
            [model]="sampleModel"
            category="children"
            [(selection)]="selection"
            [display]="display">
        </TreeView>
    `
})
export class DataModelTree {
    selection = []
    sampleModel = sampleModel
    display(_) { return _.label }
}