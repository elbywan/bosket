var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { array } from "./arrays";

export var tree = function tree(_tree4, prop) {
    var t = _tree4;
    if (!(_tree4 instanceof Array)) if ((typeof _tree4 === "undefined" ? "undefined" : _typeof(_tree4)) === "object") t = [_tree4];else throw new Error("Bad tree format");

    return {
        flatten: function flatten() {
            var flattened = [];
            var fifo = [t];
            while (fifo.length > 0) {
                var _tree = fifo.pop();
                if (!(_tree instanceof Array)) continue;
                flattened = [].concat(_toConsumableArray(array(flattened).notIn(_tree)), _toConsumableArray(_tree));
                fifo = [].concat(_toConsumableArray(fifo), _toConsumableArray(_tree.filter(function (item) {
                    return item[prop];
                }).map(function (item) {
                    return item[prop];
                })));
            }

            return flattened;
        },
        filter: function filter(filterFun) {
            var copy = t.filter(filterFun);
            var recurse = function recurse(list) {
                list.forEach(function (item) {
                    if (item[prop] && item[prop] instanceof Array) {
                        item[prop] = item[prop].filter(filterFun);
                        recurse(item[prop]);
                    }
                });
            };
            recurse(copy);
            return copy;
        },
        treeFilter: function treeFilter(filterFun) {
            var finalMap = new Map();

            var recurse = function recurse(list, map) {
                list.forEach(function (item) {
                    if (item[prop] && item[prop] instanceof Array) {
                        var childMap = new Map();
                        recurse(item[prop], childMap);
                        if (childMap.size > 0) {
                            map.set(item, childMap);
                        } else if (filterFun(item)) {
                            map.set(item, new Map());
                        }
                    } else if (filterFun(item)) {
                        map.set(item, null);
                    }
                });
            };
            recurse(t, finalMap);
            return finalMap;
        },
        add: function add(parent, elt) {
            var fifo = [t];
            while (fifo.length > 0) {
                var _tree2 = fifo.pop();
                var idx = _tree2.indexOf(parent);
                if (idx >= 0 && _tree2[idx][prop]) {
                    _tree2[idx][prop] = _tree2[idx][prop].slice();
                    _tree2[idx][prop].push(elt);
                    return t;
                }
                fifo = [].concat(_toConsumableArray(fifo), _toConsumableArray(_tree2.filter(function (item) {
                    return item[prop];
                }).map(function (item) {
                    return item[prop];
                })));
            }
            return t;
        },
        findPath: function findPath(elt) {
            var recurse = function recurse(item) {
                if (array(item).contains(elt)) return [item];
                item[prop].forEach(function (child) {
                    var path = recurse(child);
                    if (path) return [].concat(_toConsumableArray(path), [item]);
                });
            };
            return false;
        },
        visit: function visit(visitor) {
            var fifo = [t];
            while (fifo.length > 0) {
                var _tree3 = fifo.pop();
                visitor(_tree3);
                _tree3.forEach(function (child) {
                    return child[prop] && child[prop] instanceof Array ? fifo.push(child[prop]) : null;
                });
            }
        }
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(tree, "tree", "src/tools/trees.js");
}();

;
//# sourceMappingURL=trees.js.map