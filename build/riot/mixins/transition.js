"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var transitionMixin = exports.transitionMixin = function transitionMixin(nodeTarget) {
    return {
        init: function init() {
            var _this = this;

            if (!this.opts.transition) return;
            var transitionName = this.opts.transition.name;
            var origUnmount = this.unmount;

            var mountTransition = function mountTransition() {
                var target = (nodeTarget || function () {
                    return _this.root;
                })();
                if (!target) return;

                target.classList.add(transitionName);
                target.classList.add(transitionName + "-mount");
                setTimeout(function () {
                    target.classList.remove(transitionName + "-mount");
                }, 10);
            };

            var guard = false;
            var unmountTransition = function unmountTransition() {
                if (guard) return;
                guard = true;
                var target = (nodeTarget || function () {
                    return _this.root;
                })();
                if (!target) return origUnmount.call(_this);

                target.addEventListener("transitionend", function () {
                    origUnmount.call(_this);
                });
                target.classList.add(transitionName + "-unmount");
            };

            this.one("mount", mountTransition);
            Object.defineProperty(this, "unmount", {
                value: unmountTransition
            });
        }
    };
};
//# sourceMappingURL=transition.js.map