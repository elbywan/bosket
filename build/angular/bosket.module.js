import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemTree, ItemTreeNode, ItemInjector } from "./components";
var BosketModule = (function () {
    function BosketModule() {
    }
    return BosketModule;
}());
export { BosketModule };
BosketModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ItemTree, ItemTreeNode, ItemInjector],
                providers: [],
                exports: [ItemTree]
            },] },
];
BosketModule.ctorParameters = function () { return []; };
//# sourceMappingURL=bosket.module.js.map