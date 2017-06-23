import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeView, TreeViewNode, ItemInjector } from "./components";
var BosketModule = (function () {
    function BosketModule() {
    }
    BosketModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TreeView, TreeViewNode, ItemInjector],
                    providers: [],
                    exports: [TreeView]
                },] },
    ];
    BosketModule.ctorParameters = function () { return []; };
    return BosketModule;
}());
export { BosketModule };
//# sourceMappingURL=bosket.module.js.map