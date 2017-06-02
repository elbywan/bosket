export type selectionStrategy<Item extends Object> = (item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>
export type clickStrategy<Item extends Object> = (item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void
export type foldStrategy<Item extends Object> = (item: Item, folded: boolean) => boolean

export declare const selectionStrategies: {
    single<Item extends Object>(item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>): Array<Item>
    multi<Item extends Object>(item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>): Array<Item>
    modifiers<Item extends Object>(item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>): Array<Item>
    ancestors<Item extends Object>(item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>): Array<Item>
}

export declare const clickStrategies : {
    "unfold-on-selection"<Item extends Object>(item: Item) : void
    "toggle-fold"<Item extends Object>(item: Item) : void
}

export declare const foldStrategies : {
    "opener-control"<Item extends Object>(item: Item) : boolean
    "not-selected"<Item extends Object>(item: Item) : boolean
    "no-child-selection"<Item extends Object>(item: Item) : boolean
    "max-depth"<Item extends Object>(item: Item) : boolean
}