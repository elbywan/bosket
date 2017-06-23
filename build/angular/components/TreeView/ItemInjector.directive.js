import { Directive, Input, ViewContainerRef } from "@angular/core";
var ItemInjector = (function () {
    function ItemInjector(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ItemInjector.decorators = [
        { type: Directive, args: [{ selector: '[itemInjector]' },] },
    ];
    ItemInjector.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    ItemInjector.propDecorators = {
        'item': [{ type: Input, args: ["itemInjector",] },],
    };
    return ItemInjector;
}());
export { ItemInjector };
//# sourceMappingURL=ItemInjector.directive.js.map