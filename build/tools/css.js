var css = {
    classes: function classes(_classes) {
        var css = [];
        for (var key in _classes) {
            if (_classes[key]) {
                css.push(key);
            }
        }
        return css.join(" ");
    },
    addClass: function addClass(elt, cname) {
        return elt.className = elt.className.split(" ").filter(function (c) {
            return c !== cname;
        }).join(" ") + " " + cname;
    },
    removeClass: function removeClass(elt, cname) {
        return elt.className = elt.className.split(" ").filter(function (c) {
            return c !== cname;
        }).join(" ");
    },
    hasClass: function hasClass(elt, cname) {
        return elt.className.indexOf(cname) >= 0;
    }
};
export { css };
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(css, "css", "src/tools/css.js");
}();

;
//# sourceMappingURL=css.js.map