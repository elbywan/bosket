"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var listenerMixin = exports.listenerMixin = function listenerMixin(_ref) {
    var _ref$eventType = _ref.eventType,
        eventType = _ref$eventType === undefined ? "click" : _ref$eventType,
        callback = _ref.callback,
        _ref$regulate = _ref.regulate,
        regulate = _ref$regulate === undefined ? false : _ref$regulate;
    return {
        init: function init() {
            var ticking = false;

            var onEvent = function onEvent(event) {
                if (callback) {
                    if (regulate) {
                        if (!ticking) {
                            window.requestAnimationFrame(function () {
                                return callback(event, function () {
                                    return ticking = false;
                                });
                            });
                        }
                        ticking = true;
                    } else callback(event);
                }
            };
            this.one("mount", function () {
                document.addEventListener(eventType, onEvent);
            });
            this.one("unmount", function () {
                document.removeEventListener(eventType, onEvent);
            });
        }
    };
};
//# sourceMappingURL=listener.js.map