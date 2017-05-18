import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ItemTree, ItemTreeNode, ItemInjector } from "./components"

export { ItemComponent } from "./components"

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ItemTree, ItemTreeNode, ItemInjector ],
    providers: [],
    exports: [ ItemTree ]
})
export class BosketModule {}