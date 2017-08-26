var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { array, tree } from "../tools";

var singleSelect = function singleSelect(item, selection, neighbours, ancestors) {
    return array(selection).contains(item) ? [] : [item];
};
var multiSelect = function multiSelect(item, selection, neighbours, ancestors) {
    var alreadySelected = false;
    var newSelection = selection.filter(function (i) {
        // Mark if the item was already selected
        if (!alreadySelected) alreadySelected = i === item;
        // Deselect all ancestors
        return i !== item && ancestors.indexOf(i) < 0;
    });
    // Categories : deselect all children
    if (!alreadySelected && item[this.inputs.get().category] && item[this.inputs.get().category] instanceof Array) {
        tree(item[this.inputs.get().category], this.inputs.get().category).visit(function (children) {
            newSelection = array(newSelection).notIn(children);
        });
    }
    if (!alreadySelected) newSelection.push(item);
    return newSelection;
};

// Selection strategies are triggered when the selection is updated.
export var selectionStrategies = {
    // The single strategy allows only one selected item at the same time (usually the last item clicked).
    single: singleSelect,
    // The multiple strategy allows any number of selected items and will add the last item clicked to the selection list.
    multiple: multiSelect,
    /*
    The modifiers strategy is the way most file explorers behave.
    Without keyboard modifiers, only one selected item is allowed.
    While pressing the shift key, all items between the two last selected siblings are added to the selection array.
    While pressing the ctrl (or cmd for mac users) key, the item is added to the selection list.
     */
    modifiers: function modifiers(item, selection, neighbours, ancestors) {
        var _this = this;

        if (this.modifiers.control || this.modifiers.meta) {
            this.lastSelection = item;
            delete this.lastIndex;
            delete this.lastPivot;
            return multiSelect.bind(this)(item, selection, neighbours, ancestors);
        } else if (this.modifiers.shift) {
            if (!this.lastSelection) return selection;

            var originIndex = neighbours.indexOf(this.lastSelection);
            if (originIndex < 0) return selection;

            var newSelection = selection.slice();
            var endIndex = neighbours.indexOf(item);

            if (originIndex >= 0) {
                var _newSelection;

                if (this.lastPivot) {
                    var lastIndex = neighbours.indexOf(this.lastPivot);

                    var _ref = originIndex > lastIndex ? [lastIndex, originIndex] : [originIndex, lastIndex],
                        _ref2 = _slicedToArray(_ref, 2),
                        _smaller = _ref2[0],
                        _higher = _ref2[1];

                    var deletions = neighbours.slice(_smaller, _higher + 1);
                    newSelection = array(newSelection).notIn(deletions);
                }
                this.lastPivot = item;

                var _ref3 = originIndex > endIndex ? [endIndex, originIndex] : [originIndex, endIndex],
                    _ref4 = _slicedToArray(_ref3, 2),
                    smaller = _ref4[0],
                    higher = _ref4[1];

                var additions = !this.inputs.get().disabled ? neighbours.slice(smaller, higher + 1) : neighbours.slice(smaller, higher + 1).filter(function (i) {
                    return !_this.inputs.get().disabled(i);
                });
                newSelection = array(newSelection).notIn(additions);
                (_newSelection = newSelection).push.apply(_newSelection, _toConsumableArray(additions));
            }

            return newSelection;
        } else {
            this.lastSelection = item;
            delete this.lastIndex;
            delete this.lastPivot;
            return singleSelect.bind(this)(item, selection.length > 1 ? [] : selection, neighbours, ancestors);
        }
    },
    // Selects an item and its ancestors.
    ancestors: function (_ancestors) {
        function ancestors(_x, _x2, _x3, _x4) {
            return _ancestors.apply(this, arguments);
        }

        ancestors.toString = function () {
            return _ancestors.toString();
        };

        return ancestors;
    }(function (item, selection, neighbours, ancestors) {
        return selection.length === 0 ? [item] : array(selection).contains(item) ? [].concat(_toConsumableArray(ancestors)) : [].concat(_toConsumableArray(ancestors), [item]);
    })

    // Click strategies are triggered on item click
};export var clickStrategies = {
    // Unfold an item when selecting it. Pair it with the "opener-control" fold strategy.
    "unfold-on-selection": function unfoldOnSelection(item) {
        if (!this.isSelected(item)) {
            var newUnfolded = this.state.get().unfolded.filter(function (i) {
                return i !== item;
            });
            newUnfolded.push(item);
            this.state.set({ unfolded: newUnfolded });
        }
    },
    // Toggle fold/unfold. Pair it with the "opener-control" fold strategy.
    "toggle-fold": function toggleFold(item) {
        var newUnfolded = this.state.get().unfolded.filter(function (i) {
            return i !== item;
        });
        if (newUnfolded.length === this.state.get().unfolded.length) {
            newUnfolded.push(item);
        }
        this.state.set({ unfolded: newUnfolded });
    }

    // Fold strategies determine if an item will be folded or not, meaning if its children are hidden.
};export var foldStrategies = {
    // Allow the opener (usually an arrow-like element) to control the fold state.
    "opener-control": function openerControl(item) {
        return !array(this.state.get().unfolded).contains(item);
    },
    // Fold when not selected.
    "not-selected": function notSelected(item) {
        return !this.isSelected(item);
    },
    // Unfold as long as there is at least one child selected.
    "no-child-selection": function noChildSelection(item) {
        var _this2 = this;

        // naive algorithm ...
        var recurseCheck = function recurseCheck(node) {
            return _this2.isSelected(node) || node[_this2.inputs.get().category] && node[_this2.inputs.get().category] instanceof Array && node[_this2.inputs.get().category].some(recurseCheck);
        };
        return !recurseCheck(item);
    },
    // Fold every item deeper than then "max-depth" component property.
    "max-depth": function maxDepth() {
        return this.inputs.get().maxDepth && !isNaN(parseInt(this.inputs.get().maxDepth, 10)) ? this.inputs.get().depth >= parseInt(this.inputs.get().maxDepth, 10) : false;
    }
};
//# sourceMappingURL=strategies.js.map