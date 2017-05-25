export var printer = {
    debug: function debug(title, msg) {
        var headerStyle = "background-color: red; color: white; font-size: 1.1em; font-weight: bold; padding: 3px 10px; border-radius: 5px";
        var titleStyle = "color: #444; font-weight: bold; font-size: 1.1em";
        var msgStyle = "color: #222; font-weight: bold";
        /* eslint-disable */
        console.log("%cDEBUG%c " + title, headerStyle, titleStyle);
        console.log("%c" + msg, msgStyle);
        /* eslint-enable */
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(printer, "printer", "src/tools/printer.js");
}();

;
//# sourceMappingURL=printer.js.map