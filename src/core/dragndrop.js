import { tree } from "../tools/trees"

export const dragndrop = {
    drops: {
        // "Standard"" drop //
        selection: (target, model, category, selection) => {
            let updatedModel = tree(model, category).filter(e => selection.indexOf(e) < 0)
            if(target)
                target[category] = [ ...target[category], ...selection ]
            else
                updatedModel = [ ...updatedModel, ...selection ]
            return updatedModel
        },
        // Returns a list of local files/folders dropped
        filesystem: event => {
            const items = event.dataTransfer.items
            if(items && items.length > 0 && items[0].kind === "file") {
                const files = []
                for(let i = 0; i < items.length; i++) {
                    const item = items[i].webkitGetAsEntry() || items[i].getAsFile()
                    if(item) {
                        files.push(item)
                    }
                }
                return files
            }
            return null
        }
    }
}