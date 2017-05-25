export var string = function string(str) {
    return {
        contains: function contains(input) {
            return str.match(new RegExp(".*" + input + ".*", "gi"));
        }
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(string, "string", "src/tools/strings.js");
}();

;
//# sourceMappingURL=strings.js.map