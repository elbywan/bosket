function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import { ItemTree } from "../RootNode";
import { string, tree, deepMix } from "../../../tools";

export var ExplorerTree = function (_React$PureComponent) {
    _inherits(ExplorerTree, _React$PureComponent);

    function ExplorerTree() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExplorerTree);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExplorerTree.__proto__ || Object.getPrototypeOf(ExplorerTree)).call.apply(_ref, [this].concat(args))), _this), _this.conf = {
            css: {
                ItemTree: "ExplorerTree"
            },
            display: function display(item) {
                return React.createElement(
                    "a",
                    null,
                    _this.props.name(item)
                );
            },
            sort: function sort(a, b) {
                return !a[_this.props.category] === !b[_this.props.category] ? a[_this.props.name].localeCompare(b[_this.props.name]) : a[_this.props.category] ? -1 : 1;
            },
            key: function key(item) {
                return item[_this.props.name];
            },
            search: function search(input) {
                return function (i) {
                    return string(i[_this.props.name]).contains(input);
                };
            },
            strategies: {
                selection: ["modifiers"],
                click: ["unfold-on-selection"],
                fold: ["opener-control"]
            },
            dragndrop: {
                draggable: true,
                droppable: true,
                drop: function drop(target, item, event) {
                    var updatedModel = tree(_this.props.model, _this.props.category).filter(function (e) {
                        return _this.props.selection.indexOf(e) < 0;
                    });
                    if (target) target[_this.props.category] = [].concat(_toConsumableArray(target[_this.props.category]), _toConsumableArray(_this.props.selection));else updatedModel = [].concat(_toConsumableArray(updatedModel), _toConsumableArray(_this.props.selection));
                    _this.props.updateModel(updatedModel);
                }
            }
        }, _this.render = function () {
            return React.createElement(ItemTree, deepMix(_this.conf, _this.props, true));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ExplorerTree;
}(React.PureComponent);
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ExplorerTree, "ExplorerTree", "src/react/components/ExplorerTree/ExplorerTree.js");
}();

;
//# sourceMappingURL=ExplorerTree.js.map