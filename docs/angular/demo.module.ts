import { NgModule } from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { BosketModule } from "bosket/angular"

import { AppComponent, ComponentSection, TreeViewSection, ItemDisplay } from "./components"

@NgModule({
    imports: [ BosketModule, BrowserModule ],
    declarations: [ AppComponent, ComponentSection, TreeViewSection, ItemDisplay ],
    providers: [],
    bootstrap: [ AppComponent ],
    entryComponents: [ ItemDisplay ]
})
export class DemoModule {}