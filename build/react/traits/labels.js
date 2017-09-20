var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Adds i18n support through customisable labels. */

import React from "react";

import { displayName } from "./helpers";

export var withLabels = function withLabels(defaultLabels) {
    return function (Component) {
        var _class, _temp;

        return _temp = _class = function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class(props) {
                _classCallCheck(this, _class);

                var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

                _this.labels = _extends({}, defaultLabels);

                _this.labels = _extends({}, defaultLabels, props.labels);
                return _this;
            }

            _createClass(_class, [{
                key: "componentWillUpdate",
                value: function componentWillUpdate(nextProps) {
                    if (nextProps.labels !== this.props.labels) this.labels = _extends({}, defaultLabels, nextProps.labels);
                }
            }, {
                key: "render",
                value: function render() {
                    return React.createElement(Component, _extends({}, this.props, { labels: this.labels }));
                }
            }]);

            return _class;
        }(React.Component), _class.displayName = displayName("withLabels", Component), _temp;
    };
};
//# sourceMappingURL=labels.js.map