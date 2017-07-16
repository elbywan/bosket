import { NgModule } from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { BosketModule } from "bosket/angular"


import { AppComponent, SyntaxHighlight, ComponentDemo, TreeViewDemo, ItemDisplay } from "./components"
import { Planner, PlannerContent, PlannerInjector } from "./plan/Planner.component"
import * as pc from "./plan/imports"

const plannerComponents = [
    pc.Introduction,
    pc.Usage,
    pc.Import,
    pc.DataModel,
    pc.DataModelTree,
    pc.TreeView,
    pc.TreeViewBasicUsage,
    pc.TreeViewDemo
]

@NgModule({
    imports: [ BosketModule, BrowserModule ],
    declarations: [
        AppComponent,
        SyntaxHighlight,
        ComponentDemo,
        TreeViewDemo,
        ItemDisplay,
        Planner,
        PlannerContent,
        PlannerInjector,
        ...plannerComponents
    ],
    providers: [],
    bootstrap: [ AppComponent ],
    entryComponents: [ ItemDisplay, PlannerInjector, ...plannerComponents ]
})
export class DemoModule {}