

/* eslint-disable no-useless-escape */
export var string = function string(str) {
    return {
        contains: function contains(input) {
            return !!str && !!str.match(new RegExp(".*" + input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + ".*", "gi"));
        }
    };
};
//# sourceMappingURL=strings.js.map