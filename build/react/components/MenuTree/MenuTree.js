function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import { ItemTree } from "../RootNode";
import { deepMix } from "../../../tools";

export var MenuTree = function (_React$PureComponent) {
    _inherits(MenuTree, _React$PureComponent);

    function MenuTree() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuTree);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuTree.__proto__ || Object.getPrototypeOf(MenuTree)).call.apply(_ref, [this].concat(args))), _this), _this.conf = {
            css: {
                ItemTree: "MenuTree"
            },
            strategies: {
                selection: ["ancestors"],
                click: ["unfold-on-selection"],
                fold: ["not-selected", "no-child-selection"]
            },
            noOpener: true,
            dragndrop: {
                draggable: false,
                droppable: false
            },
            display: function display(item) {
                return item[_this.props.name];
            },
            key: function key(item) {
                return item[_this.props.name];
            }
        }, _this.render = function () {
            return React.createElement(ItemTree, deepMix(_this.conf, _this.props, true));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return MenuTree;
}(React.PureComponent);
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(MenuTree, "MenuTree", "src/react/components/MenuTree/MenuTree.js");
}();

;
//# sourceMappingURL=MenuTree.js.map