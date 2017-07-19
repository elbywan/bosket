import { ComponentFactoryResolver, ViewContainerRef, OnChanges, SimpleChanges } from "@angular/core";
export interface DisplayComponent<Item> {
    item: Item;
    inputs?: any;
}
export declare class ItemInjector implements OnChanges {
    viewContainerRef: ViewContainerRef;
    private _componentFactoryResolver;
    constructor(viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver);
    item: any;
    component: any;
    inputs: any;
    componentRef: any;
    ngOnChanges(changes: SimpleChanges): void;
}
