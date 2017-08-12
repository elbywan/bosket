import { Component } from "@angular/core"

@Component({
    template: `
        <div class="marged">
            <pre class="itemType">Object (details below)</pre>

            <p>
                <em>Used in conjunction with the onDrag, onDrag and onCancel properties.</em><br>
                <br>
                The drag'n'drop configuration object.
            </p>

            <div class="emphasis">
                <syntax-highlight language="typescript">{{ defaultsCode }} </syntax-highlight>
            </div>

            <p>Tip: for mobile drag'n'drop, use a <em><a target="_blank" rel="noopener noreferrer" href="https://github.com/Bernardo-Castilho/dragdroptouch">polyfill</a></em>.</p>

            <syntax-highlight language="typescript">{{ code }} </syntax-highlight>

            <p>Example of a draggable tree associated with a droppable tree :</p>

            <drag-tree></drag-tree>
            <drop-tree></drop-tree>

            <syntax-highlight language="typescript">{{ example }} </syntax-highlight>
        </div>
    `
})
export class DragndropProp {
    defaultsCode = `
        dragndrop: {
            draggable: false, // make items draggable
            droppable: false, // make the tree droppable
            guard:     null   // prevents dragover and drop
        }
    `

    code = `
        /* [Drag'n'drop presets](https://github.com/elbywan/bosket/blob/master/src/core/dragndrop.js) */

        dragndrop = {
            // To drag or drop on specific items
            // you can use a function : (item) => true/false
            draggable: true,
            droppable: true,

            // target       -> the dragged item
            // event        -> the dragover event
            // inputs       -> props of the component where the dragover event is triggered
            guard: (target, event, inputs) => {
                /* ... */
            }
        }

        <TreeView /* ... */ [dragndrop]="dragndrop"></TreeView>`

    example = `
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
            template: \`
                <div class="tree-sample">
                    <TreeView
                        [model]="model"
                        category="children"
                        [(selection)]="selection"
                        [display]="display"
                        [strategies]="strategies"
                        [dragndrop]="dragndrop"
                        (onDrag)="onDrag($event)"
                        (onCancel)="onCancel($event)">
                    </TreeView>
                </div>
            \`
        })
        export class DragTree {
            pluckPreset = dragndrop.pluck(() => this.model, m => this.model = m)

            model : Object[] = dragModel
            selection = []
            display = i => i.name
            strategies = { fold: [() => false] }

            dragndrop = { draggable: this.pluckPreset.draggable }
            onDrag = ({target, event, inputs}) => this.pluckPreset.drag(target, event, inputs)
            onCancel = this.pluckPreset.cancel
        }

        @Component({
            selector: "drop-tree",
            template: \`
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
            \`
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
    `
}
