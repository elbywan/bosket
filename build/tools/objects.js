var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var object = function object(self) {
    if (!self || !(self instanceof Object)) {
        throw new Error("Bad object format");
    }

    return {
        shallowCompare: function shallowCompare(obj, excludes) {
            var equals = true;
            for (var key in self) {
                if (self.hasOwnProperty(key)) {
                    if (!(excludes && excludes.indexOf(key) >= 0) && obj[key] !== self[key]) {
                        equals = false;
                        return;
                    }
                }
            }
            return equals;
        },
        filter: function filter(fun) {
            var copy = {};
            for (var prop in self) {
                if (self.hasOwnProperty(prop) && fun(self[prop])) copy[prop] = self[prop];
            }
            return copy;
        },
        map: function map(fun) {
            var copy = {};
            for (var prop in self) {
                if (self.hasOwnProperty(prop)) copy[prop] = fun(self[prop]);
            }
            return copy;
        },
        fullMap: function fullMap(fun) {
            var copy = {};
            for (var prop in self) {
                if (self.hasOwnProperty(prop)) {
                    var _fun = fun(prop, self[prop]),
                        _fun2 = _slicedToArray(_fun, 2),
                        newProp = _fun2[0],
                        newVal = _fun2[1];

                    copy[newProp] = newVal;
                }
            }
            return copy;
        },
        nestPrefix: function nestPrefix(prefix) {
            var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_) {
                return _;
            };

            var copy = _defineProperty({}, prefix, {});
            for (var prop in self) {
                if (self.hasOwnProperty(prop) && prop.startsWith(prefix)) {
                    copy[prefix][transform(prop.substring(prefix.length))] = self[prop];
                } else {
                    copy[prop] = self[prop];
                }
            }
            return copy;
        }
    };
};
//# sourceMappingURL=objects.js.map