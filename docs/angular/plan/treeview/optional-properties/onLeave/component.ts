import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Hook on dragleave.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnLeaveProp {
    code = `
        const onLeave = ({event}) => event.currentTarget.style.color = "blue"

        <TreeView /*...*/ (onLeave)="onLeave($event)"></TreeView>
    `
}
