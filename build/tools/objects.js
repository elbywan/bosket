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
        }
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(object, "object", "src/tools/objects.js");
}();

;
//# sourceMappingURL=objects.js.map