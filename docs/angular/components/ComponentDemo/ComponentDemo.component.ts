import { Component, Input } from "@angular/core"

import "self/common/styles/ComponentDemo.css"

@Component({
    selector: "component-demo",
    template: `
        <div class="ComponentDemo section">
            <h3>{{ componentName }}</h3>
            <p> {{ description }}</p>
            <div class="ComponentDemo flex-container">
                <div class="ComponentDemo demo-area">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class ComponentDemo {
    @Input() componentName : string
    @Input() description: string
}