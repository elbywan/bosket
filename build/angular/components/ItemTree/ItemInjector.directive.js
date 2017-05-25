import { Directive, Input, ViewContainerRef } from "@angular/core";
var ItemInjector = (function () {
    function ItemInjector(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    return ItemInjector;
}());
export { ItemInjector };
ItemInjector.decorators = [
    { type: Directive, args: [{ selector: '[itemInjector]' },] },
];
ItemInjector.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ItemInjector.propDecorators = {
    'item': [{ type: Input, args: ["itemInjector",] },],
};
//# sourceMappingURL=ItemInjector.directive.js.map