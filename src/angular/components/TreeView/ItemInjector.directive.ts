import { Directive, Input, ComponentFactoryResolver,
    ViewContainerRef, OnChanges, SimpleChanges } from "@angular/core"

/* Injects a custom component to enhance item display if needed */

export interface ItemComponent<Item> {
    item: Item
    inputs?: any
}

@Directive({ selector: '[itemInjector]'})
export class ItemInjector implements OnChanges {
    constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) { }
    @Input("itemInjector") item
    @Input("inject") component
    @Input("inputs") inputs
    componentRef = null

    ngOnChanges(changes: SimpleChanges) {
        if(!this.component || !this.item) return

        if(changes.component) {
            this.viewContainerRef.clear()
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component)
            this.componentRef = this.viewContainerRef.createComponent(componentFactory)
        }
        if(this.componentRef && changes.item)
            (<ItemComponent<any>> this.componentRef.instance).item = this.item
        if(this.componentRef && changes.inputs)
            (<ItemComponent<any>> this.componentRef.instance).inputs = this.inputs
    }
}
