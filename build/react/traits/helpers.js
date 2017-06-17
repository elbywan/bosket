import React from "react";
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */

/* eslint-enable */

export var displayName = function displayName(name, WrappedComponent) {
    return name + "(" + (WrappedComponent.displayName || WrappedComponent.name || "Component") + ")";
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(displayName, "displayName", "src/react/traits/helpers.js");
}();

;
//# sourceMappingURL=helpers.js.map