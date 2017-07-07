

export var array = function array(self) {
    return {
        last: function last() {
            return self.length > 0 ? self[self.length - 1] : null;
        },
        "in": function _in(arr, otherCondition) {
            return self.filter(function (elt) {
                return arr.indexOf(elt) >= 0 && (!otherCondition || otherCondition(elt));
            });
        },
        notIn: function notIn(arr, otherCondition) {
            return self.filter(function (elt) {
                return arr.indexOf(elt) < 0 && (!otherCondition || otherCondition(elt));
            });
        },
        is: function is(_ref, otherCondition) {
            var _ref$isIn = _ref.isIn,
                isIn = _ref$isIn === undefined ? [] : _ref$isIn,
                _ref$notIn = _ref.notIn,
                notIn = _ref$notIn === undefined ? [] : _ref$notIn;
            return self.filter(function (elt) {
                return isIn.reduce(function (acc, curr) {
                    return curr.indexOf(elt) >= 0 && acc;
                }, true) && notIn.reduce(function (acc, curr) {
                    return curr.indexOf(elt) < 0 && acc;
                }, true) && (!otherCondition || otherCondition(elt));
            });
        },
        contains: function contains(element) {
            return self.indexOf(element) >= 0;
        },
        allIn: function allIn(arr) {
            return self.every(function (elt) {
                return arr.indexOf(elt) >= 0;
            });
        }
    };
};
//# sourceMappingURL=arrays.js.map