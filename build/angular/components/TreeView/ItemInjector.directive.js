import { Directive, Input, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
var ItemInjector = (function () {
    function ItemInjector(viewContainerRef, _componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.componentRef = null;
    }
    ItemInjector.prototype.ngOnChanges = function (changes) {
        if (!this.component || !this.item)
            return;
        if (changes.component) {
            this.viewContainerRef.clear();
            try {
                var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component);
                this.componentRef = this.viewContainerRef.createComponent(componentFactory);
            }
            catch (e) {
                try {
                    var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component(this.item, this.inputs));
                    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
                }
                catch (e) {
                    throw e;
                }
            }
        }
        if (this.componentRef && changes.item)
            this.componentRef.instance.item = this.item;
        if (this.componentRef && changes.inputs)
            this.componentRef.instance.inputs = this.inputs;
    };
    ItemInjector.decorators = [
        { type: Directive, args: [{ selector: '[itemInjector]' },] },
    ];
    ItemInjector.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ComponentFactoryResolver, },
    ]; };
    ItemInjector.propDecorators = {
        'item': [{ type: Input, args: ["itemInjector",] },],
        'component': [{ type: Input, args: ["inject",] },],
        'inputs': [{ type: Input, args: ["inputs",] },],
    };
    return ItemInjector;
}());
export { ItemInjector };
//# sourceMappingURL=ItemInjector.directive.js.map