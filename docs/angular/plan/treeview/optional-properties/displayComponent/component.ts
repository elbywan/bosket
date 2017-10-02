import { Component } from "@angular/core"

@Component({
    template: `
    <div class="marged">
        <pre class="itemType">Component | (item: Object, inputs: Object) => Component</pre>
        <p>
            <em>The display and displayComponent properties are mutually exclusive.</em><br>
            <br>
            Allows more customization than the display property, by wrapping items inside an angular component.<br>
            You can even pass a function which will return any component depending on the context.<br>
        </p>
        <syntax-highlight language="typescript">{{ code }}</syntax-highlight>
    </div>
    `
})
export class DisplayComponentProp {
    code = `
        import { DisplayComponent } from "@bosket/angular"

        // This component wraps items within an anchor tag
        @Component({
            template: "<a>{{ item.label }}</a>"
        })
        export class ItemDisplay implements DisplayComponent<{ label }> {
            // Injected item
            @Input() item : { label }
            // Injected input properties from the component which is rendered
            @Input() inputs
        }

        @Component({
            selector: "display-component-sample",
            template: \`
                <TreeView
                    ...
                    [model]="model"
                    [displayComponent]="displayComponent"
                    ...
                    >
                </TreeView>\`
        })
        export class DisplayComponentSample {
            public model = [{ label : "Orange" }, { label : "Apple" }]
            public displayComponent = ItemDisplay
            /* ... */
        }
    `
}
