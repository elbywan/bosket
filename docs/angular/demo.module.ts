import { NgModule } from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { BosketModule } from "../../src/angular"

import { AppComponent, ComponentSection, ItemTreeSection, ItemDisplay } from "./components"

@NgModule({
    imports: [ BosketModule, BrowserModule ],
    declarations: [ AppComponent, ComponentSection, ItemTreeSection, ItemDisplay ],
    providers: [],
    bootstrap: [ AppComponent ],
    entryComponents: [ ItemDisplay ]
})
export class DemoModule {}