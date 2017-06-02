import { Directive, Input, ViewContainerRef } from "@angular/core"

/* Injects a custom component to enhance item display if needed */

export interface ItemComponent<Item> {
    item: Item
}

@Directive({ selector: '[itemInjector]'})
export class ItemInjector {
    constructor(public viewContainerRef: ViewContainerRef) { }
    @Input ("itemInjector") item
    public componentRef : ItemComponent<any>
}