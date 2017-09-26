import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Hook on dragover.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnOverProp {
    code = `
        const onOver = ({event}) => event.currentTarget.style.color = "green"

        <TreeView /*...*/ (onOver)="onOver($event)"></TreeView>
    `
}
