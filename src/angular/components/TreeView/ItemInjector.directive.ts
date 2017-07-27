import { Directive, Input, ComponentFactoryResolver,
    ViewContainerRef, OnChanges, SimpleChanges } from "@angular/core"

/* Injects a custom component to enhance item display if needed */

export interface DisplayComponent<Item> {
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
            try {
                let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component)
                this.componentRef = this.viewContainerRef.createComponent(componentFactory)
            } catch (e) {
                try {
                    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component(this.item, this.inputs))
                    this.componentRef = this.viewContainerRef.createComponent(componentFactory)
                } catch(e) {
                    throw e
                }
            }

        }
        if(this.componentRef && changes.item)
            (<DisplayComponent<any>> this.componentRef.instance).item = this.item
        if(this.componentRef && changes.inputs)
            (<DisplayComponent<any>> this.componentRef.instance).inputs = this.inputs
    }
}
