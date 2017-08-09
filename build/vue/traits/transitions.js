import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Adds transitions on component mount / unmount. */

export var withTransition = function withTransition(_ref) {
    var key = _ref.key;
    return function (Component) {
        return {
            name: "withTransition-" + Component.name,
            props: Component.props ? [].concat(_toConsumableArray(Component.props)) : [],
            render: function render() {
                var h = arguments[0];

                var props = {
                    props: _extends({}, this.$props)
                };
                var transition = _extends({}, this.transition);

                if (!this.transition) return h(
                    Component,
                    props,
                    []
                );
                return h(
                    "transition",
                    transition,
                    [h(
                        Component,
                        _mergeJSXProps([props, { key: key(this.$props) }]),
                        []
                    )]
                );
            }
        };
    };
};
//# sourceMappingURL=transitions.js.map