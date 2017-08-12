import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Action to perform on drop</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnDropProp {
    code = `
        const onDrop = ({target, event, inputs}) => {
            const data = JSON.parse(event.dataTransfer.getData("application/json"))
            console.log("data dropped : " + data)
        }

        <TreeView /*...*/ (onDrop)="onDrop($event)"></TreeView>
    `
}
