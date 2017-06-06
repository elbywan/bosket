var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arrayRecursion = function arrayRecursion(target, source1, source2) {
    for (var prop in source1) {
        if (source1[prop] instanceof Array && source2[prop] instanceof Array) {
            target[prop] = [].concat(_toConsumableArray(source1[prop]), _toConsumableArray(source2[prop]));
        } else if (_typeof(source1[prop]) === "object" && _typeof(source2[prop]) === "object") {
            target[prop] = arrayRecursion(target, source1[prop], source2[prop]);
        }
    }
};

export var deepMix = function deepMix(one, two) {
    var mergeArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var clone = _extends({}, one, two);

    if (mergeArrays) {
        arrayRecursion(clone, one, two);
    }

    return clone;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(arrayRecursion, "arrayRecursion", "src/tools/mixin.js");

    __REACT_HOT_LOADER__.register(deepMix, "deepMix", "src/tools/mixin.js");
}();

;
//# sourceMappingURL=mixin.js.map