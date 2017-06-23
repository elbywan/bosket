// export const nodeEvents : {
//     onDragStart:    <Item extends Object>(item: Item) => (event: DragEvent) => void
//     onDragOver:     <Item extends Object>(item: Item) => (event: DragEvent) => void
//     onDragEnter:    <Item extends Object>(item: Item) => (event: DragEvent) => void
//     onDragLeave:    <Item extends Object>(item: Item) => (event: DragEvent) => void
//     onDrop:         <Item extends Object>(item: Item) => (event: DragEvent) => void
// }

export type dragndrop = {
    draggable:  boolean | (() => boolean),
    droppable:  boolean | (() => boolean),
    drag?:      (event: DragEvent, item: Object, inputs: Object) => void,
    guard?:     (event: DragEvent, item: Object, inputs: Object) => boolean,
    drop?:      (event: DragEvent, item: Object, inputs: Object) => void,
    cancel?:    (event: DragEvent, item: Object, inputs: Object) => void
}

export const dragndrop: {
    selection: (model: () => Object[], cb: (updatedModel: Object[]) => void) => dragndrop
}

export const utils: {
    filesystem(event: DragEvent): File[] | WebKitFileSystem[] | null
}
