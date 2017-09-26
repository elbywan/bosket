// @flow

import { css, array, tree } from "../tools"

// Drag and drop presets //

export const dragndrop = {
    // Moves the selection //
    selection: (model: void => Object[], cb: Object[] => void) => ({
        draggable: true,
        droppable: true,
        drag: (item: Object, event: DragEvent, inputs: Object) => {
            event.dataTransfer && event.dataTransfer.setData("application/json", JSON.stringify(inputs.selection))
        },
        guard: (target: ?Object, event: DragEvent, inputs: Object) => {
            // Other data types
            if(event && event.dataTransfer && event.dataTransfer.types.indexOf("application/json") < 0)
                return false
            // Prevent drop on self
            const selfDrop = () => target && array(inputs.selection).contains(target)
            // Prevent drop on child
            const childDrop = () => inputs.ancestors &&
                    inputs.ancestors.reduce((prev, curr) =>
                        prev || array(inputs.selection).contains(curr), false)

            return selfDrop() || childDrop()
        },
        drop: (target: ?Object, event: DragEvent, inputs: Object) => {
            let updatedModel = tree(model(), inputs.category).filter(e => inputs.selection.indexOf(e) < 0)
            const adjustedTarget =
                target ?
                    target[inputs.category] && target[inputs.category] instanceof Array ?
                        target :
                        array(inputs.ancestors).last() :
                    null
            if(adjustedTarget)
                adjustedTarget[inputs.category] = [ ...adjustedTarget[inputs.category], ...inputs.selection ]
            else
                updatedModel = [ ...updatedModel, ...inputs.selection ]
            cb(updatedModel)
        }
    }),
    // Plucks an item on drag
    pluck: (model: void => Object[], cb: Object[] => void) => ({
        draggable: true,
        backup: [],
        drag: (item: Object, event: DragEvent, inputs: Object) => {
            bak = JSON.stringify(model())
            event.dataTransfer && event.dataTransfer.setData("application/json", JSON.stringify(item))
            setTimeout(() => cb(tree(model(), inputs.category).filter(e => e !== item)), 20)
        },
        cancel: () => {
            cb(JSON.parse(bak))
        }
    }),
    // Pastes item(s) on drop
    paste: (model: void => Object[], cb: Object[] => void) => ({
        droppable: true,
        drop: (target: Object, event: DragEvent, inputs: Object) => {
            if(event.dataTransfer && event.dataTransfer.types.indexOf("application/json") > -1) {
                const data = JSON.parse(event.dataTransfer.getData("application/json"))
                let updatedModel = [...model()]
                const adjustedTarget =
                    target ?
                        target[inputs.category] && target[inputs.category] instanceof Array ?
                            target :
                            array(inputs.ancestors).last() :
                        null
                if(adjustedTarget)
                    adjustedTarget[inputs.category] = [ ...adjustedTarget[inputs.category], data ]
                else
                    updatedModel = [ ...updatedModel, data ]
                cb(updatedModel)
            }
        }
    })
}
let bak = "[]"

// Utils

export const utils = {
    // Returns a list of local files/folders dropped
    filesystem: (event: DragEvent) => {
        const items = event.dataTransfer ? event.dataTransfer.items : null
        if(items && items.length > 0 && items[0].kind === "file") {
            const files = []
            for(let i = 0; i < items.length; i++) {
                /* eslint-disable */
                const item = (items[i] : any).webkitGetAsEntry() || items[i].getAsFile()
                /* eslint-enable */
                if(item) {
                    files.push(item)
                }
            }
            return files
        }
        return null
    }
}

// Internal use //

const hoverReferences = {
    itemRef: undefined,
    guardCheck: false
}
export const nodeEvents = {
    onDragStart: function(item: ?Object) {
        return function(event: DragEvent) {
            event.stopPropagation()
            this.inputs.get().dragndrop.onDrag(item, event, this.inputs.get())
        }
    },
    onDragOver: function(item: ?Object) {
        return function(event: DragEvent) {
            event.preventDefault()
            event.stopPropagation()

            const guardCheck =
                hoverReferences.itemRef === item ? hoverReferences.guardCheck :
                    this.inputs.get().dragndrop.guard &&
                    this.inputs.get().dragndrop.guard(item, event, this.inputs.get())

            if(guardCheck) {
                if(event.dataTransfer) event.dataTransfer.dropEffect = "none"
                css.addClass(event.currentTarget, this.mixCss("nodrop"))
            } else {
                if(event.dataTransfer) event.dataTransfer.dropEffect = "copy"
                css.addClass(event.currentTarget, this.mixCss("dragover"))
            }

            hoverReferences.itemRef = item
            hoverReferences.guardCheck = guardCheck

            this.inputs.get().dragndrop.onOver(item, event, this.inputs.get())
        }
    },
    onDragEnter: function(item: ?Object) {
        return function(event: DragEvent) {
            event.preventDefault()
            event.stopPropagation()
            // If dragging over an opener
            if(item && (this.hasChildren(item) || this.isAsync(item)) && css.hasClass(event.target, this.mixCss("opener"))) {
                const newVal = this.state.get().unfolded.filter(i => i !== item)
                newVal.push(item)
                this.state.set({ unfolded: newVal })
            }

            this.inputs.get().dragndrop.onEnter(item, event, this.inputs.get())
        }
    },
    onDragLeave:  function(item: ?Object) {
        return function(event: DragEvent) {
            event.stopPropagation()
            css.removeClass(event.currentTarget, this.mixCss("dragover"))
            css.removeClass(event.currentTarget, this.mixCss("nodrop"))

            this.inputs.get().dragndrop.onLeave(item, event, this.inputs.get())
        }
    },
    onDrop: function(item: ?Object) {
        return function(event: DragEvent) {
            event.stopPropagation()
            css.removeClass(event.currentTarget, this.mixCss("dragover"))
            css.removeClass(event.currentTarget, this.mixCss("nodrop"))
            if(!this.inputs.get().dragndrop.guard || !this.inputs.get().dragndrop.guard(item, event, this.inputs.get())) {
                this.inputs.get().dragndrop.onDrop(item, event, this.inputs.get())
            }
        }
    },
    onDragEnd: function(item: ?Object) {
        return function(event: DragEvent) {
            event.stopPropagation()
            if(event.dataTransfer && event.dataTransfer.dropEffect === "none")
                this.inputs.get().dragndrop.onCancel(item, event, this.inputs.get())
        }
    }
}

export const wrapEvents = function() {
    return {
        ...this.inputs.get().dragndrop,
        onDrag: (target: Object, event: DragEvent, inputs: Object) => {
            if(!array(this.inputs.get().selection).contains(target)) {
                this.onSelect(target, inputs.ancestors, inputs.neighbours)
            }

            this.outputs.onDrag && this.outputs.onDrag(target, event, inputs)
        },
        onOver: (target: Object, event: DragEvent, inputs: Object) => {
            this.outputs.onOver && this.outputs.onOver(target, event, inputs)
        },
        onEnter: (target: Object, event: DragEvent, inputs: Object) => {
            this.outputs.onEnter && this.outputs.onEnter(target, event, inputs)
        },
        onLeave: (target: Object, event: DragEvent, inputs: Object) => {
            this.outputs.onLeave && this.outputs.onLeave(target, event, inputs)
        },
        onDrop: (target: Object, event: DragEvent, inputs: Object) => {
            event.preventDefault()
            this.outputs.onDrop && this.outputs.onDrop(target, event, inputs)
        },
        onCancel: (target: Object, event: DragEvent, inputs: Object) => {
            event.preventDefault()
            if(event.dataTransfer && event.dataTransfer.dropEffect === "none")
                this.outputs.onCancel && this.outputs.onCancel(target, event, inputs)
        }
    }
}
