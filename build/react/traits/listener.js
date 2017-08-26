var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Adds a configurable global listener. */

import React from "react";

import { displayName } from "./helpers";

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
        var _class, _temp;

        return _temp = _class = function (_React$Component) {
            _inherits(_class, _React$Component);

            /* Lifecycle */

            function _class(props) {
                _classCallCheck(this, _class);

                var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

                _this.listening = false;
                _this.ticking = false;
                _this.callback = null;

                _this.subscribe = function (cb) {
                    _this.callback = cb;
                };

                _this.onEvent = function (event) {
                    var _this2 = this;

                    if (this.callback) {
                        if (regulate) {
                            if (!this.ticking) {
                                var callback = this.callback;
                                window.requestAnimationFrame(function () {
                                    return callback(event, function () {
                                        _this2.ticking = false;
                                    });
                                });
                            }
                            this.ticking = true;
                        } else this.callback(event);
                    }
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
                _this.listenerProp = _defineProperty({}, propName, {
                    subscribe: _this.subscribe,
                    mount: _this.mount,
                    unmount: _this.unmount
                });
                return _this;
            }

            _createClass(_class, [{
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
                    return React.createElement(Component, _extends({}, this.listenerProp, this.props));
                }
            }]);

            return _class;
        }(React.Component), _class.displayName = displayName("withListener", Component), _temp;
    };
};
//# sourceMappingURL=listener.js.map