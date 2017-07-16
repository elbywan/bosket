import { Component } from "@angular/core"
import plan from "self/angular/plan/plan"

import "self/common/styles/App.css"

@Component({
    selector: "div#framework-root",
    template: `
        <div class="App">
            <planner [plan]="plan" [maxDepth]="1" [sticky]="true"></planner>
        </div>
    `
})
export class AppComponent {
    public plan = plan
}
