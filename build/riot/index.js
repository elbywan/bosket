"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = require("./mixins");

Object.keys(_mixins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mixins[key];
    }
  });
});

require("./components");
//# sourceMappingURL=index.js.map