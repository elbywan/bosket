import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TreeView, TreeViewNode, ItemInjector } from "./components"

export { ItemComponent } from "./components"

@NgModule({
    imports: [ CommonModule ],
    declarations: [ TreeView, TreeViewNode, ItemInjector ],
    providers: [],
    exports: [ TreeView ]
})
export class BosketModule {}