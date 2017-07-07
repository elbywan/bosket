

/* HOC reducer helper */
export var combine = function combine() {
    for (var _len = arguments.length, factories = Array(_len), _key = 0; _key < _len; _key++) {
        factories[_key] = arguments[_key];
    }

    return function (Component) {
        return factories.reduce(function (accu, factory) {
            return factory(accu);
        }, Component);
    };
};

export * from "./listener";
export * from "./labels";
export * from "./transitions";
export * from "./debug";
//# sourceMappingURL=index.js.map