function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import { TreeView } from "../TreeView";
import { deepMix } from "../../../tools";

export var MenuView = function (_React$PureComponent) {
    _inherits(MenuView, _React$PureComponent);

    function MenuView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuView.__proto__ || Object.getPrototypeOf(MenuView)).call.apply(_ref, [this].concat(args))), _this), _this.conf = {
            css: {
                TreeView: "MenuView"
            },
            strategies: {
                selection: ["ancestors"],
                click: ["unfold-on-selection"],
                fold: ["not-selected", "no-child-selection"]
            },
            noOpener: true,
            display: function display(item) {
                return item[_this.props.name];
            },
            key: function key(item) {
                return item[_this.props.name];
            }
        }, _this.render = function () {
            return React.createElement(TreeView, deepMix(_this.conf, _this.props, true));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return MenuView;
}(React.PureComponent);
//# sourceMappingURL=MenuView.js.map