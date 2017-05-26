export const dragndrop: {
    drops: {
        selection<Item extends Object>(target: Item, model: Item[], category: string, selection: Item[]): Item[],
        filesystem(event: DragEvent): File[] | WebKitFileSystem[] | null
    }
}