var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import { TreeView } from "../TreeView";
import { string, deepMix } from "../../../tools";
import { dragndrop } from "../../../core";

export var ExplorerView = function (_React$PureComponent) {
    _inherits(ExplorerView, _React$PureComponent);

    function ExplorerView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExplorerView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExplorerView.__proto__ || Object.getPrototypeOf(ExplorerView)).call.apply(_ref, [this].concat(args))), _this), _this.conf = {
            css: {
                TreeView: "ExplorerView"
            },
            display: function display(item) {
                return React.createElement(
                    "a",
                    null,
                    item[_this.props.name]
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
            dragndrop: _extends({}, dragndrop.selection(function () {
                return _this.props.model;
            }, _this.props.updateModel), {
                droppable: function droppable(_) {
                    return !_ || _[_this.props.category];
                }
            })
        }, _this.render = function () {
            return React.createElement(TreeView, deepMix(_this.conf, _this.props, true));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ExplorerView;
}(React.PureComponent);
//# sourceMappingURL=ExplorerView.js.map