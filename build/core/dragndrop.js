function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { tree } from "../tools/trees";

var dragndrop = {
    drops: {
        // "Standard"" drop //
        selection: function selection(target, model, category, _selection) {
            var updatedModel = tree(model, category).filter(function (e) {
                return _selection.indexOf(e) < 0;
            });
            if (target) target[category] = [].concat(_toConsumableArray(target[category]), _toConsumableArray(_selection));else updatedModel = [].concat(_toConsumableArray(updatedModel), _toConsumableArray(_selection));
            return updatedModel;
        },
        // Returns a list of local files/folders dropped
        filesystem: function filesystem(event) {
            var items = event.dataTransfer.items;
            if (items && items.length > 0 && items[0].kind === "file") {
                var files = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i].webkitGetAsEntry() || items[i].getAsFile();
                    if (item) {
                        files.push(item);
                    }
                }
                return files;
            }
            return null;
        }
    }
};
export { dragndrop };
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(dragndrop, "dragndrop", "src/core/dragndrop.js");
}();

;
//# sourceMappingURL=dragndrop.js.map