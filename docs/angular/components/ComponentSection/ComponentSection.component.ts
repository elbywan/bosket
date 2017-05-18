import { Component, Input } from "@angular/core"

@Component({
    selector: "component-section",
    template: `
        <div class="ComponentSection section">
            <h3>{{ componentName }}</h3>
            <p> {{ description }}</p>
            <div class="ComponentSection highlight">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .ComponentSection.section {
            padding: 5px 25px 25px;
            margin: 20px;
            box-shadow: 0px 0px 5px #666;
        }

        .ComponentSection.section > h3 {
            font-weight: 500;
            font-size: 1.5em;
        }

        .ComponentSection > div.highlight {
            background-image: repeating-linear-gradient(145deg, #fff, #fff 30px, #f5f5f5 30px, #f5f5f5 60px);
            border: 2px solid #EEE;
            padding: 20px;
        }
    `]
})
export class ComponentSection {
    @Input() componentName : string
    @Input() description: string
}