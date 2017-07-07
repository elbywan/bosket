var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

export var deepMix = function deepMix(one, two) {
    var mergeArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!one || !two || (typeof one === "undefined" ? "undefined" : _typeof(one)) !== "object" || (typeof two === "undefined" ? "undefined" : _typeof(two)) !== "object") return one;

    var clone = _extends({}, one, two);
    for (var prop in two) {
        if (two.hasOwnProperty(prop)) {
            if (two[prop] instanceof Array && one[prop] instanceof Array) {
                clone[prop] = mergeArrays ? [].concat(_toConsumableArray(one[prop]), _toConsumableArray(two[prop])) : clone[prop] = two[prop];
            } else if (_typeof(two[prop]) === "object" && _typeof(one[prop]) === "object") {
                clone[prop] = deepMix(one[prop], two[prop], mergeArrays);
            }
        }
    }

    return clone;
};
//# sourceMappingURL=mixin.js.map