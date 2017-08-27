"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _riot = require("riot");

var _riot2 = _interopRequireDefault(_riot);

var _mixins = require("../mixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _riot2.default.tag("with-transition", false, function (opts) {
    var _this = this;

    this.mixin((0, _mixins.transitionMixin)());
    var updateKeys = function updateKeys() {
        for (var key in _this.parent) {
            if (_this.parent.hasOwnProperty(key)) _this[key] = _this.parent[key];
        }
    };
    updateKeys();
    this.on("update", updateKeys);
});
//# sourceMappingURL=transitionDirective.js.map