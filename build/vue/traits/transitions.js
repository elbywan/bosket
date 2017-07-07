import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* Adds transitions on component mount / unmount. */

export var withTransition = function withTransition(_ref) {
    var key = _ref.key;
    return function (Component) {
        return {
            name: "withTransition-" + Component.name,
            functional: true,
            render: function render(h, ctx) {
                if (!ctx.props.transition) return h(
                    Component,
                    ctx.data,
                    []
                );
                var transitionProps = _extends({}, ctx.props.transition);
                return h(
                    "transition",
                    transitionProps,
                    [h(
                        Component,
                        _mergeJSXProps([ctx.data, { key: key(ctx.props) }]),
                        []
                    )]
                );
            }
        };
    };
};
//# sourceMappingURL=transitions.js.map