import React from "react";
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */

/* eslint-enable */

export var displayName = function displayName(name, WrappedComponent) {
    return name + "(" + (WrappedComponent.displayName || WrappedComponent.name || "Component") + ")";
};
//# sourceMappingURL=helpers.js.map