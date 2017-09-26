import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">{{ "({target: Object, event: DragEvent, inputs: Object}) => void" }}</pre>
            <p>Hook on dragenter.</p>
            <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
        </div>
    `
})
export class OnEnterProp {
    code = `
        const onEnter = ({event}) => event.currentTarget.style.color = "red"

        <TreeView /*...*/ (onEnter)="onEnter($event)"></TreeView>
    `
}
