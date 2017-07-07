import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* Adds i18n support through customisable labels. */

export var withLabels = function withLabels(defaultLabels) {
    return function (Component) {
        return {
            name: "withLabels-" + Component.name,
            functional: true,
            render: function render(h, ctx) {
                return h(
                    Component,
                    _mergeJSXProps([{ props: ctx.props }, {
                        attrs: { labels: _extends({}, defaultLabels, ctx.props.labels) }
                    }]),
                    []
                );
            }
        };
    };
};
//# sourceMappingURL=labels.js.map