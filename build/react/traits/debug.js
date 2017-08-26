var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Add debug info for component updates */

import React from "react";

import { displayName } from "./helpers";

import { printer } from "../../tools/printer";

export var withDebugUpdates = function withDebugUpdates() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$print = _ref.print,
        print = _ref$print === undefined ? function (_) {
        return _;
    } : _ref$print;

    return function (Component) {
        var _class, _temp2;

        return _temp2 = _class = function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class() {
                var _ref2;

                var _temp, _this, _ret;

                _classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref2, [this].concat(args))), _this), _this.monkeyPatch = function (ref) {
                    if (!ref) return true;
                    var originalFunction = ref.shouldComponentUpdate;
                    ref.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
                        var propsDiff = [];
                        var stateDiff = [];
                        for (var key in nextProps) {
                            if (nextProps[key] !== ref.props[key]) propsDiff.push(key);
                        }
                        for (var _key2 in nextState) {
                            if (nextState[_key2] !== ref.state[_key2]) stateDiff.push(_key2);
                        }
                        /* eslint-disable */
                        printer.debug("shouldComponentUpdate [" + print(ref.toString()) + "]", "State diff : " + stateDiff.join(" ") + "\nProps diff : " + propsDiff.join(" "));
                        /* eslint-enable */
                        return originalFunction && originalFunction.bind(ref)(nextProps, nextState) || true;
                    };
                }, _this.render = function () {
                    return React.createElement(Component, _extends({}, _this.props, {
                        ref: function ref(_ref3) {
                            return _this.monkeyPatch(_ref3);
                        } }));
                }, _temp), _possibleConstructorReturn(_this, _ret);
            }

            return _class;
        }(React.Component), _class.displayName = displayName("withDebugUpdates", Component), _temp2;
    };
};
//# sourceMappingURL=debug.js.map