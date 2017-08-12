import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Action to perform on drag'n'drop cancellation.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnCancelProp {
    code = `
        const onCancel = ({target, event, inputs}) => {
            console.log("The drag was cancelled")
        }

        <TreeView /*...*/ (onCancel)="onCancel($event)"></TreeView>
    `
}
