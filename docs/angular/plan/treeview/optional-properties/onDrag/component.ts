import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Action to perform on drag.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnDragProp {
    code = `
        const onDrag = ({target, event, inputs}) =>
            event.dataTransfer.setData("application/json", JSON.stringify(inputs.selection))

        <TreeView /*...*/ (onDrag)="onDrag($event)"></TreeView>
    `
}
