import { NgModule } from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { BosketModule } from "@bosket/angular"


import { AppComponent, SyntaxHighlight, ComponentDemo, ItemDisplay } from "./components"
import { Planner, PlannerContent, PlannerInjector } from "./plan/Planner.component"
import { plannerComponents } from "./plan/exports"
import { demoDeclarations, demoEntryComponents } from "./components/Demos/exports"

@NgModule({
    imports: [ BosketModule, BrowserModule ],
    declarations: [
        AppComponent,
        SyntaxHighlight,
        ComponentDemo,
        ItemDisplay,
        Planner,
        PlannerContent,
        PlannerInjector,
        ...plannerComponents,
        ...demoDeclarations
    ],
    providers: [],
    bootstrap: [ AppComponent ],
    entryComponents: [
        ItemDisplay,
        PlannerInjector,
        ...plannerComponents,
        ...demoEntryComponents
    ]
})
export class DemoModule {}