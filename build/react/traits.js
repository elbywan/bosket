var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { mixin } from "../tools/mixin";
import { printer } from "../tools/printer";
import React from "react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

/* Setup higher order component with a readable name. */
var setupHoc = function setupHoc(hocFactory, name) {
    return function (Component) {
        var hoc = hocFactory(Component);
        hoc.displayName = name + "(" + (Component.displayName || Component.name || "Component") + ")";
        return hoc;
    };
};

/* HOC reducer helper */
export var combine = function combine() {
    for (var _len = arguments.length, traits = Array(_len), _key = 0; _key < _len; _key++) {
        traits[_key] = arguments[_key];
    }

    return function (Component) {
        return traits.reduce(function (accu, trait) {
            return trait(accu);
        }, Component);
    };
};

/* Adds i18n support through customisable labels. */
var withLabels = function withLabels(defaultLabels) {
    return setupHoc(function (Component) {
        return function (_ref) {
            var _ref$labels = _ref.labels,
                labels = _ref$labels === undefined ? {} : _ref$labels,
                rest = _objectWithoutProperties(_ref, ["labels"]);

            return React.createElement(Component, _extends({ labels: mixin(defaultLabels, labels) }, rest));
        };
    }, "withLabels");
};

/* Adds a configurable global listener. */
export { withLabels };
export var withListener = function withListener() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$eventType = _ref2.eventType,
        eventType = _ref2$eventType === undefined ? "click" : _ref2$eventType,
        _ref2$propName = _ref2.propName,
        propName = _ref2$propName === undefined ? "globalListener" : _ref2$propName,
        _ref2$mountOn = _ref2.mountOn,
        mountOn = _ref2$mountOn === undefined ? null : _ref2$mountOn,
        _ref2$autoMount = _ref2.autoMount,
        autoMount = _ref2$autoMount === undefined ? false : _ref2$autoMount;

    return setupHoc(function (Component) {
        return function (_React$Component) {
            _inherits(_class2, _React$Component);

            /* Lifecycle */

            function _class2(props) {
                _classCallCheck(this, _class2);

                var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

                _this.callback = null;

                _this.subscribe = function (cb) {
                    _this.callback = cb;
                };

                _this.onEvent = function (event) {
                    if (this.callback) this.callback(event);
                }.bind(_this);

                _this.mount = function () {
                    if (!_this.listening) {
                        document.addEventListener(eventType, _this.onEvent);
                        _this.listening = true;
                    }
                };

                _this.unmount = function () {
                    if (_this.listening) {
                        document.removeEventListener(eventType, _this.onEvent);
                        _this.listening = false;
                    }
                };

                if (autoMount) _this.mount();
                return _this;
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

                /* Events */

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
        }(React.Component);
    }, "withListener");
};

/* Adds transitions on component mount / unmount. */
export var withTransition = function withTransition(_ref3) {
    var key = _ref3.key;
    return setupHoc(function (Component) {
        return function (props) {
            return props.transition ? React.createElement(
                CSSTransitionGroup,
                props.transition,
                React.createElement(Component, _extends({}, props, { key: key(props) }))
            ) : React.createElement(Component, props);
        };
    }, "withTransition");
};

/* Add debug info for component updates */
export var withDebugUpdates = function withDebugUpdates() {
    var print = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a) {
        return a;
    };
    return setupHoc(function (Component) {
        return function (_React$Component2) {
            _inherits(_class4, _React$Component2);

            function _class4() {
                var _ref4;

                var _temp, _this2, _ret;

                _classCallCheck(this, _class4);

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref4 = _class4.__proto__ || Object.getPrototypeOf(_class4)).call.apply(_ref4, [this].concat(args))), _this2), _this2.monkeyPatch = function (ref) {
                    if (!ref) return;
                    var originalFunction = ref.shouldComponentUpdate;
                    var shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
                        var propsDiff = [];
                        var stateDiff = [];
                        for (var key in nextProps) {
                            if (nextProps[key] !== ref.props[key]) propsDiff.push(key);
                        }
                        for (var _key3 in nextState) {
                            if (nextState[_key3] !== ref.state[_key3]) stateDiff.push(_key3);
                        }
                        /* eslint-disable */
                        printer.debug("shouldComponentUpdate [" + print(ref) + "]", "State diff : " + stateDiff + "\nProps diff : " + propsDiff);
                        /* eslint-enable */
                        return originalFunction.bind(ref)(nextProps, nextState);
                    };
                    ref.shouldComponentUpdate = shouldComponentUpdate;
                }, _this2.render = function () {
                    return React.createElement(Component, _extends({}, _this2.props, {
                        ref: function ref(_ref5) {
                            return _this2.monkeyPatch(_ref5);
                        } }));
                }, _temp), _possibleConstructorReturn(_this2, _ret);
            }

            return _class4;
        }(React.Component);
    }, "withDebugUpdates");
};
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setupHoc, "setupHoc", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(combine, "combine", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withLabels, "withLabels", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withListener, "withListener", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withTransition, "withTransition", "src/react/traits.js");

    __REACT_HOT_LOADER__.register(withDebugUpdates, "withDebugUpdates", "src/react/traits.js");
}();

;
//# sourceMappingURL=traits.js.map