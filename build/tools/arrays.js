export var array = function array(self) {
    if (!self || !(self instanceof Array)) throw new Error("Bad array format");

    return {
        last: function last() {
            return self.length > 0 ? self[self.length - 1] : null;
        },
        "in": function _in(arr) {
            var otherCondition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (elt) {
                return true;
            };
            return self.filter(function (elt) {
                return arr.indexOf(elt) >= 0 && otherCondition(elt);
            });
        },
        notIn: function notIn(arr) {
            var otherCondition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (elt) {
                return true;
            };
            return self.filter(function (elt) {
                return arr.indexOf(elt) < 0 && otherCondition(elt);
            });
        },
        is: function is(_ref) {
            var _ref$isIn = _ref.isIn,
                isIn = _ref$isIn === undefined ? [] : _ref$isIn,
                _ref$notIn = _ref.notIn,
                notIn = _ref$notIn === undefined ? [] : _ref$notIn;
            var otherCondition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (elt) {
                return true;
            };
            return self.filter(function (elt) {
                return isIn.reduce(function (acc, curr) {
                    return curr.indexOf(elt) >= 0 && acc;
                }, true) && notIn.reduce(function (acc, curr) {
                    return curr.indexOf(elt) < 0 && acc;
                }, true) && otherCondition(elt);
            });
        },
        contains: function contains(element) {
            return self.indexOf(element) >= 0;
        }
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(array, "array", "src/tools/arrays.js");
}();

;
//# sourceMappingURL=arrays.js.map