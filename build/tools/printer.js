export var printer = {
    debug: function debug(title, msg /* eslint-enable */) {
        var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;

        var headerStyle = "background-color: red; color: white; font-size: 1.1em; font-weight: bold; padding: 3px 10px; border-radius: 5px";
        var titleStyle = "color: #444; font-weight: bold; font-size: 1.1em";
        var msgStyle = "color: #222; font-weight: bold";

        logger("%cDEBUG%c " + title, headerStyle, titleStyle);
        logger("%c" + msg, msgStyle);
    }
};
//# sourceMappingURL=printer.js.map