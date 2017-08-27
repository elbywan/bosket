var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Adds a configurable global listener. */

export var withListener = function withListener(_ref) {
    var _ref$eventType = _ref.eventType,
        eventType = _ref$eventType === undefined ? "click" : _ref$eventType,
        _ref$prop = _ref.prop,
        prop = _ref$prop === undefined ? "listener" : _ref$prop,
        _ref$mountOn = _ref.mountOn,
        mountOn = _ref$mountOn === undefined ? null : _ref$mountOn,
        _ref$autoMount = _ref.autoMount,
        autoMount = _ref$autoMount === undefined ? false : _ref$autoMount,
        _ref$regulate = _ref.regulate,
        regulate = _ref$regulate === undefined ? false : _ref$regulate;
    return function (Component) {
        return {
            name: "withListener-" + Component.name,
            props: Component.props ? [].concat(_toConsumableArray(Component.props)) : [],
            created: function created() {
                if (autoMount) this.mount(this);
            },
            beforeDestroy: function beforeDestroy() {
                this.unmount();
            },
            beforeUpdate: function beforeUpdate() {
                if (mountOn) mountOn(this.$props) ? this.mount(this) : this.unmount();
            },

            data: function data() {
                return {
                    listening: false,
                    ticking: false,
                    callback: null
                };
            },
            methods: {
                /* Subscriptions */

                subscribe: function subscribe(cb) {
                    this.callback = cb;
                },
                onEvent: function onEvent(event) {
                    var _this = this;

                    if (this.callback) {
                        if (regulate) {
                            if (!this.ticking) {
                                var callback = this.callback;
                                window.requestAnimationFrame(function () {
                                    return callback(event, function () {
                                        _this.ticking = false;
                                    });
                                });
                            }
                            this.ticking = true;
                        } else this.callback(event);
                    }
                },


                /* Events */

                mount: function mount() {
                    if (!this.listening) {
                        document.addEventListener(eventType, this.onEvent);
                        this.listening = true;
                    }
                },
                unmount: function unmount() {
                    if (this.listening) {
                        document.removeEventListener(eventType, this.onEvent);
                        this.listening = false;
                    }
                }
            },
            render: function render() {
                var h = arguments[0];

                var listener = _defineProperty({}, prop, {
                    subscribe: this.subscribe,
                    mount: this.mount,
                    unmount: this.unmount
                });
                var props = {
                    props: _extends({}, this.$props, listener)
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
//# sourceMappingURL=listener.js.map