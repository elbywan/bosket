function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import { TreeView } from "../TreeView";
import { array, deepMix } from "../../../tools";

export var FlatView = function (_React$PureComponent) {
    _inherits(FlatView, _React$PureComponent);

    function FlatView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FlatView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FlatView.__proto__ || Object.getPrototypeOf(FlatView)).call.apply(_ref, [this].concat(args))), _this), _this.conf = {
            css: {
                TreeView: "FlatView"
            },
            strategies: {
                selection: ["multiple"],
                click: [],
                fold: [function (item) {
                    return false;
                }]
            },
            disabled: function disabled(item) {
                return !array(_this.props.selection).contains(item) && _this.props.limit && _this.props.selection.length >= _this.props.limit || item[_this.props.category];
            },
            display: function display(item) {
                return item[_this.props.name];
            },
            key: function key(item) {
                return item[_this.props.name];
            },
            noOpener: true
        }, _this.render = function () {
            return React.createElement(TreeView, deepMix(_this.conf, _this.props, true));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return FlatView;
}(React.PureComponent);
//# sourceMappingURL=FlatView.js.map