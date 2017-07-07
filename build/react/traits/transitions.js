var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Adds transitions on component mount / unmount. */

import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { displayName } from "./helpers";

export var withTransition = function withTransition(_ref) {
    var key = _ref.key;
    return function (Component) {
        var _class, _temp2;

        return _temp2 = _class = function (_React$PureComponent) {
            _inherits(_class, _React$PureComponent);

            function _class() {
                var _ref2;

                var _temp, _this, _ret;

                _classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref2, [this].concat(args))), _this), _this.render = function () {
                    return _this.props.transition ? React.createElement(
                        CSSTransitionGroup,
                        _this.props.transition,
                        React.createElement(Component, _extends({}, _this.props, { key: key(_this.props) }))
                    ) : React.createElement(Component, _this.props);
                }, _temp), _possibleConstructorReturn(_this, _ret);
            }

            return _class;
        }(React.PureComponent), _class.displayName = displayName("withTransition", Component), _temp2;
    };
};
//# sourceMappingURL=transitions.js.map