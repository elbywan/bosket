"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var optsMixin = exports.optsMixin = function optsMixin() {
    var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "opts";
    return {
        init: function init() {
            this.on("update", this.updateOpts);
            this._originalOpts = Object.keys(this.opts);
            this.updateOpts();
        },
        updateOpts: function updateOpts() {
            if (!this.opts) return;
            for (var key in this.opts[argument]) {
                if (!~this._originalOpts.indexOf(key)) this.opts[key] = this.opts[argument][key];
            }
        }
    };
};
//# sourceMappingURL=opts.js.map