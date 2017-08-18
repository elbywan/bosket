export var string = function string(str) {
    return {
        contains: function contains(input) {
            return !!str && !!str.match(new RegExp(".*" + input + ".*", "gi"));
        }
    };
};
//# sourceMappingURL=strings.js.map