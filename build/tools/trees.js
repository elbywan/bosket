function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { array } from "./arrays";

// crashes gen-flow-files : type treeMap<T> = Map<T, treeMap<T>>


export var tree = function tree(t, prop) {
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
            var path = tree(t, prop).path(parent);
            if (path instanceof Array) {
                parent[prop] = [].concat(_toConsumableArray(parent[prop]), [elt]);
                path.forEach(function (p) {
                    return p[prop] = [].concat(_toConsumableArray(p[prop]));
                });
                return [].concat(_toConsumableArray(t));
            } else {
                return t;
            }
        },
        visit: function visit(visitor) {
            var fifo = [t];
            while (fifo.length > 0) {
                var _tree2 = fifo.pop();
                visitor(_tree2);
                _tree2.forEach(function (child) {
                    return child[prop] && child[prop] instanceof Array ? fifo.push(child[prop]) : null;
                });
            }
        },
        path: function path(elt) {
            var recurse = function recurse(item) {
                if (item === elt) return [];
                if (!item[prop]) return false;
                for (var i = 0; i < item[prop].length; i++) {
                    var check = recurse(item[prop][i]);
                    if (check) return [item].concat(_toConsumableArray(check));
                }
                return false;
            };
            for (var i = 0; i < t.length; i++) {
                var check = recurse(t[i]);
                if (check) return check;
            }
            return false;
        }
    };
};
//# sourceMappingURL=trees.js.map