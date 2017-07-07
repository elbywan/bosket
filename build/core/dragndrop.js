var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { css, array, tree } from "../tools";

// Drag and drop presets //

export var dragndrop = {
    // Moves the selection //
    selection: function selection(model, cb) {
        return {
            draggable: true,
            droppable: true,
            guard: function guard(target, event, inputs) {
                // Other data types
                if (event && event.dataTransfer && event.dataTransfer.types.length > 0) return false;
                // Prevent drop on self
                var selfDrop = function selfDrop() {
                    return target && array(inputs.selection).contains(target
                    // Prevent drop on child
                    );
                };var childDrop = function childDrop() {
                    return inputs.ancestors && inputs.ancestors.reduce(function (prev, curr) {
                        return prev || array(inputs.selection).contains(curr);
                    }, false);
                };

                return selfDrop() || childDrop();
            },
            drop: function drop(target, event, inputs) {
                var updatedModel = tree(model(), inputs.category).filter(function (e) {
                    return inputs.selection.indexOf(e) < 0;
                });
                var adjustedTarget = target ? target[inputs.category] && target[inputs.category] instanceof Array ? target : array(inputs.ancestors).last() : null;
                if (adjustedTarget) adjustedTarget[inputs.category] = [].concat(_toConsumableArray(adjustedTarget[inputs.category]), _toConsumableArray(inputs.selection));else updatedModel = [].concat(_toConsumableArray(updatedModel), _toConsumableArray(inputs.selection));
                cb(updatedModel);
            }
        };
    },
    // Plucks an item on drag
    pluck: function pluck(model, cb) {
        return {
            draggable: true,
            backup: [],
            drag: function drag(item, event, inputs) {
                bak = JSON.stringify(model());
                event.dataTransfer && event.dataTransfer.setData("application/json", JSON.stringify(item));
                setTimeout(function () {
                    return cb(tree(model(), inputs.category).filter(function (e) {
                        return e !== item;
                    }));
                }, 20);
            },
            cancel: function cancel() {
                setTimeout(function () {
                    return cb(JSON.parse(bak));
                }, 20);
            }
        };
    },
    // Pastes item(s) on drop
    paste: function paste(model, cb) {
        return {
            droppable: true,
            drop: function drop(target, event, inputs) {
                if (event.dataTransfer && event.dataTransfer.types.indexOf("application/json") > -1) {
                    var data = JSON.parse(event.dataTransfer.getData("application/json"));
                    var updatedModel = [].concat(_toConsumableArray(model()));
                    var adjustedTarget = target ? target[inputs.category] && target[inputs.category] instanceof Array ? target : array(inputs.ancestors).last() : null;
                    if (adjustedTarget) adjustedTarget[inputs.category] = [].concat(_toConsumableArray(adjustedTarget[inputs.category]), [data]);else updatedModel = [].concat(_toConsumableArray(updatedModel), [data]);
                    cb(updatedModel);
                }
            }
        };
    }
};
var bak = "[]";

// Utils

export var utils = {
    // Returns a list of local files/folders dropped
    filesystem: function filesystem(event) {
        var items = event.dataTransfer ? event.dataTransfer.items : null;
        if (items && items.length > 0 && items[0].kind === "file") {
            var files = [];
            for (var i = 0; i < items.length; i++) {
                /* eslint-disable */
                var item = items[i].webkitGetAsEntry() || items[i].getAsFile
                /* eslint-enable */
                ();if (item) {
                    files.push(item);
                }
            }
            return files;
        }
        return null;
    }

    // Internal use //

};export var nodeEvents = {
    onDragStart: function onDragStart(item) {
        return function (event) {
            event.stopPropagation();
            this.inputs.get().dragndrop.onDrag(item, event, this.inputs.get());
        };
    },
    onDragOver: function onDragOver(item) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.inputs.get().dragndrop.guard && this.inputs.get().dragndrop.guard(item, event, this.inputs.get())) {
                event.dataTransfer && (event.dataTransfer.dropEffect = "none");
                css.addClass(event.currentTarget, this.mixCss("nodrop"));
                return;
            }

            css.addClass(event.currentTarget, this.mixCss("dragover"));
        };
    },
    onDragEnter: function onDragEnter(item) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation
            // If dragging over an opener
            ();if (item && (this.hasChildren(item) || this.isAsync(item)) && css.hasClass(event.target, this.mixCss("opener"))) {
                var newVal = this.state.get().unfolded.filter(function (i) {
                    return i !== item;
                });
                newVal.push(item);
                this.state.set({ unfolded: newVal });
            }
        };
    },
    onDragLeave: function onDragLeave(event) {
        event.stopPropagation();
        css.removeClass(event.currentTarget, this.mixCss("dragover"));
        css.removeClass(event.currentTarget, this.mixCss("nodrop"));
    },
    onDrop: function onDrop(item) {
        return function (event) {
            event.stopPropagation();
            css.removeClass(event.currentTarget, this.mixCss("dragover"));
            css.removeClass(event.currentTarget, this.mixCss("nodrop"));
            this.inputs.get().dragndrop.onDrop(item, event, this.inputs.get());
        };
    },
    onDragEnd: function onDragEnd(item) {
        return function (event) {
            event.stopPropagation();
            if (event.dataTransfer && event.dataTransfer.dropEffect === "none") this.inputs.get().dragndrop.onCancel(item, event, this.inputs.get());
        };
    }
};

export var wrapEvents = function wrapEvents() {
    var _this = this;

    return _extends({}, this.inputs.get().dragndrop, {
        onDrag: function onDrag(target, event, inputs) {
            if (!array(_this.inputs.get().selection).contains(target)) {
                _this.onSelect(target, inputs.ancestors, inputs.neighbours);
            }

            _this.outputs.onDrag && _this.outputs.onDrag(target, event, inputs);
        },
        onDrop: function onDrop(target, event, inputs) {
            event.preventDefault();
            _this.outputs.onDrop && _this.outputs.onDrop(target, event, inputs);
        },
        onCancel: function onCancel(target, event, inputs) {
            event.preventDefault();
            if (event.dataTransfer && event.dataTransfer.dropEffect === "none") _this.outputs.onCancel && _this.outputs.onCancel(target, event, inputs);
        }
    });
};
//# sourceMappingURL=dragndrop.js.map