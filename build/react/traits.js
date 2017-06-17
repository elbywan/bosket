var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { printer } from "../tools/printer";
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */

/* eslint-enable */

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

var displayName = function displayName(name, WrappedComponent) {
    return name + "(" + (WrappedComponent.displayName || WrappedComponent.name || "Component") + ")";
};

/* Adds i18n support through customisable labels. */
export var withLabels = function withLabels(defaultLabels) {
    return function (Component) {
        var _class, _temp;

        return _temp = _class = function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: "render",
                value: function render() {
                    return React.createElement(Component, _extends({}, this.props, { labels: _extends({}, defaultLabels, this.props.labels) }));
                }
            }]);

            return _class;
        }(React.Component), _class.displayName = displayName("withLabels", Component), _temp;
    };
};

/* Adds a configurable global listener. */
export var withListener = function withListener() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$eventType = _ref.eventType,
        eventType = _ref$eventType === undefined ? "click" : _ref$eventType,
        _ref$propName = _ref.propName,
        propName = _ref$propName === undefined ? "listener" : _ref$propName,
        _ref$mountOn = _ref.mountOn,
        mountOn = _ref$mountOn === undefined ? null : _ref$mountOn,
        _ref$autoMount = _ref.autoMount,
        autoMount = _ref$autoMount === undefined ? false : _ref$autoMount,
        _ref$regulate = _ref.regulate,
        regulate = _ref$regulate === undefined ? false : _ref$regulate;

    return function (Component) {
        var _class2, _temp2;

        return _temp2 = _class2 = function (_React$Component2) {
            _inherits(_class2, _React$Component2);

            /* Lifecycle */

            function _class2(props) {
                _classCallCheck(this, _class2);

                var _this2

                /* Events */

                = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

                _this2.listening = false;
                _this2.ticking = false;
                _this2.callback = null;

                _this2.subscribe = function (cb) {
                    _this2.callback = cb;
                };

                _this2.onEvent = function (event) {
                    var _this3 = this;

                    if (this.callback) {
                        if (regulate) {
                            if (!this.ticking) {
                                var callback = this.callback;
                                window.requestAnimationFrame(function () {
                                    return callback(event, function () {
                                        _this3.ticking = false;
                                    });
                                });
                            }
                            this.ticking = true;
                        } else this.callback(event);
                    }
                }.bind(_this2);

                _this2.mount = function () {
                    if (!_this2.listening) {
                        document.addEventListener(eventType, _this2.onEvent);
                        _this2.listening = true;
                    }
                };

                _this2.unmount = function () {
                    if (_this2.listening) {
                        document.removeEventListener(eventType, _this2.onEvent);
                        _this2.listening = false;
                    }
                };

                if (autoMount) _this2.mount();
                return _this2;
            }

            _createClass(_class2, [{
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    this.unmount();
                }
            }, {
                key: "componentWillReceiveProps",
                value: function componentWillReceiveProps(nextProps) {
                    if (mountOn) mountOn.bind(this)(nextProps) ? this.mount() : this.unmount();
                }

                /* Subscriptions */

            }, {
                key: "render",


                /* Rendering */

                value: function render() {
                    var listener = _defineProperty({}, propName, {
                        subscribe: this.subscribe,
                        mount: this.mount,
                        unmount: this.unmount
                    });
                    return React.createElement(Component, _extends({}, listener, this.props));
                }
            }]);

            return _class2;
        }(React.Component), _class2.displayName = displayName("withListener", Component), _temp2;
    };
};

/* Adds transitions on component mount / unmount. */
export var withTransition = function withTransition(_ref2) {
    var key = _ref2.key;
    return function (Component) {
        var _class3, _temp4;

        return _temp4 = _class3 = function (_React$PureComponent) {
            _inherits(_class3, _React$PureComponent);

            function _class3() {
                var _ref3;

                var _temp3, _this4, _ret;

                _classCallCheck(this, _class3);

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _ret = (_temp3 = (_this4 = _possibleConstructorReturn(this, (_ref3 = _class3.__proto__ || Object.getPrototypeOf(_class3)).call.apply(_ref3, [this].concat(args))), _this4), _this4.render = function () {
                    return _this4.props.transition ? React.createElement(
                        CSSTransitionGroup,
                        _this4.props.transition,
                        React.createElement(Component, _extends({}, _this4.props, { key: key(_this4.props) }))
                    ) : React.createElement(Component, _this4.props);
                }, _temp3), _possibleConstructorReturn(_this4, _ret);
            }

            return _class3;
        }(React.PureComponent), _class3.displayName = displayName("withTransition", Component), _temp4;
    };
};

/* Add debug info for component updates */
export var withDebugUpdates = function withDebugUpdates(_ref4) {
    var _ref4$print = _ref4.print,
        print = _ref4$print === undefined ? function (_) {
        return _;
    } : _ref4$print;
    return function (Component) {
        var _class4, _temp6;

        return _temp6 = _class4 = function (_React$Component3) {
            _inherits(_class4, _React$Component3);

            function _class4() {
                var _ref5;

                var _temp5, _this5, _ret2;

                _classCallCheck(this, _class4);

                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return _ret2 = (_temp5 = (_this5 = _possibleConstructorReturn(this, (_ref5 = _class4.__proto__ || Object.getPrototypeOf(_class4)).call.apply(_ref5, [this].concat(args))), _this5), _this5.monkeyPatch = function (ref) {
                    if (!ref) return;
                    var originalFunction = ref.shouldComponentUpdate;
                    ref.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
                        var propsDiff = [];
                        var stateDiff = [];
                        for (var key in nextProps) {
                            if (nextProps[key] !== ref.props[key]) propsDiff.push(key);
                        }
                        for (var _key4 in nextState) {
                            if (nextState[_key4] !== ref.state[_key4]) stateDiff.push(_key4);
                        }
                        /* eslint-disable */
                        printer.debug("shouldComponentUpdate [" + print(ref.toString()) + "]", "State diff : " + stateDiff.join(" ") + "\nProps diff : " + propsDiff.join(" ")
                        /* eslint-enable */
                        );return originalFunction.bind(ref)(nextProps, nextState);
                    };
                }, _this5.render = function () {
                    return React.createElement(Component, _extends({}, _this5.props, {
                        ref: function ref(_ref6) {
                            return _this5.monkeyPatch(_ref6);
                        } }));
                }, _temp5), _possibleConstructorReturn(_this5, _ret2);
            }

            return _class4;
        }(React.Component), _class4.displayName = displayName("withDebugUpdates", Component), _temp6;
    };
};
;

var _temp7 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(combine, "combine", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(displayName, "displayName", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withLabels, "withLabels", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withListener, "withListener", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withTransition, "withTransition", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withDebugUpdates, "withDebugUpdates", "src/react/traits.js");
}();

;
//# sourceMappingURL=traits.js.map