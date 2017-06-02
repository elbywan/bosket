import { ViewContainerRef } from "@angular/core";
export interface ItemComponent<Item> {
    item: Item;
}
export declare class ItemInjector {
    viewContainerRef: ViewContainerRef;
    constructor(viewContainerRef: ViewContainerRef);
    item: any;
    componentRef: ItemComponent<any>;
}
