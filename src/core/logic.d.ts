export declare class Core {
    constructor(inputs: {get: Function, set: Function}, outputs: Object, state: Object, refresh: () => void)
}

export declare class TreeNode<Item extends Object> extends Core {

    pending: Array<Item>

    /* Checks */

    isSelected:  (Item) => boolean
    isFolded:    (Item) => boolean
    hasChildren: (Item) => boolean
    isAsync:     (Item) => boolean
    isDisabled:  (Item) => boolean
    isDraggable: (Item) => boolean
    isDroppable: (Item) => boolean

    /* Styles */

    mixCss: (prop: string) => string
    ulCss: () => string
    liCss: (Item) => string

    /* Promises */

    unwrapPromise: (Item) => Promise<any>

    /* Events */

    onClick:        ((Item) => (MouseEvent) => string) | null
    onOpener:       ((Item) => (MouseEvent) => string) | null

    getDragEvents: (Item, boolean?) => {
        draggable:       boolean,
        onDragStart?:    (DragEvent) => string,
        onDragOver?:     (DragEvent) => string,
        onDragEnter?:    (DragEvent) => string,
        onDragLeave?:    (DragEvent) => string,
        onDragEnd?:      (DragEvent) => string,
        onDrop?:         (DragEvent) => string,
    }
}

export declare class RootNode<Item extends Object> extends Core {

     defaultStrategies: {
        selectionStrategy,
        clickStrategy,
        foldStrategy
    }
    defaultAsync: (Function) => Promise<any>
    modifiers: Object

    mixCss: (prop: string) => string
    filterTree: (input: string) => (Array<Item> | null)

    /* Events */
    onKey: (KeyboardEvent) => void
    onSelect: (item: Item, ancestors: Array<Item>, neighbours: Array<Item>) => Array<Item>

    wrapDragNDrop: () => {
        draggable,
        droppable,
        guard?,
        onDrag?,
        onOver?,
        onEnter?,
        onLeave?,
        onDrop?,
        onCancel?
    }

}
