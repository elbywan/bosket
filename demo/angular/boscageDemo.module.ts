import { NgModule } from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { BoscageModule } from "../../src/angular"

import { AppComponent, ComponentSection, ItemTreeSection, ItemDisplay } from "./components"

@NgModule({
    imports: [ BoscageModule, BrowserModule ],
    declarations: [ AppComponent, ComponentSection, ItemTreeSection, ItemDisplay ],
    providers: [],
    bootstrap: [ AppComponent ],
    entryComponents: [ ItemDisplay ]
})
export class BoscageDemoModule {}