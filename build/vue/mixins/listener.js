/* Adds a configurable global listener. */

export var mixListener = function mixListener() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$eventType = _ref.eventType,
        eventType = _ref$eventType === undefined ? "click" : _ref$eventType,
        _ref$cb = _ref.cb,
        cb = _ref$cb === undefined ? "callback" : _ref$cb,
        _ref$mountOn = _ref.mountOn,
        mountOn = _ref$mountOn === undefined ? null : _ref$mountOn,
        _ref$autoMount = _ref.autoMount,
        autoMount = _ref$autoMount === undefined ? false : _ref$autoMount,
        _ref$regulate = _ref.regulate,
        regulate = _ref$regulate === undefined ? false : _ref$regulate;

    var self = {
        listening: false,
        ticking: false,
        listenerRef: null,
        onEvent: function onEvent(instance) {
            if (!self.listenerRef) self.listenerRef = function (event) {
                if (instance[cb]) {
                    if (regulate) {
                        if (!self.ticking) {
                            var callback = instance[cb];
                            window.requestAnimationFrame(function () {
                                return callback(event, function () {
                                    self.ticking = false;
                                });
                            });
                        }
                        self.ticking = true;
                    } else instance[cb](event);
                }
            };
            return self.listenerRef;
        },
        mount: function mount(instance) {
            if (!self.listening) {
                document.addEventListener(eventType, self.onEvent(instance));
                self.listening = true;
            }
        },
        unmount: function unmount() {
            if (self.listening) {
                document.removeEventListener(eventType, self.listenerRef);
                self.listening = false;
            }
        }
    };

    return {
        created: function created() {
            if (autoMount) self.mount(this);
        },
        beforeDestroy: function beforeDestroy() {
            self.unmount();
        },
        beforeUpdate: function beforeUpdate() {
            if (mountOn) mountOn(this.$props) ? self.mount(this) : self.unmount();
        }
    };
};
//# sourceMappingURL=listener.js.map