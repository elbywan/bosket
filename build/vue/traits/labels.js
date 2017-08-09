var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Adds i18n support through customisable labels. */

export var withLabels = function withLabels(defaultLabels) {
    return function (Component) {
        return {
            name: "withLabels-" + Component.name,
            props: Component.props ? [].concat(_toConsumableArray(Component.props)) : [],
            render: function render() {
                var h = arguments[0];

                var props = {
                    props: _extends({}, this.$props, {
                        labels: _extends({}, defaultLabels, this.$props.labels)
                    })
                };
                return h(
                    Component,
                    props,
                    []
                );
            }
        };
    };
};
//# sourceMappingURL=labels.js.map