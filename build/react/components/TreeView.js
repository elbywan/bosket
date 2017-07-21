var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { withLabels, combine, withListener } from "../traits";
import { tree } from "../../tools/trees";
import { RootNode, defaults } from "../../core";
import { TreeViewNode } from "./TreeViewNode";

var TreeViewBaseClass = function (_React$PureComponent) {
    _inherits(TreeViewBaseClass, _React$PureComponent);

    /* Data & lifecycle */
    function TreeViewBaseClass(props) {
        _classCallCheck(this, TreeViewBaseClass);

        var _this = _possibleConstructorReturn(this, (TreeViewBaseClass.__proto__ || Object.getPrototypeOf(TreeViewBaseClass)).call(this, props));

        _this.state = {
            search: "",
            filtered: null
        };
        _this._state = {
            get: function get() {
                return _this.state;
            },
            set: function set(s) {
                return _this.setState(s);
            }
        };
        _this._props = {
            get: function get() {
                return _extends({}, defaults, _this.props);
            }
        };

        _this.onSearch = function (evt) {
            var input = evt.currentTarget.value;
            _this.setState({
                search: input,
                filtered: !input.trim() ? null : tree(_this.props.model, _this.props.category
                /* eslint-disable */
                ).treeFilter(_this.props.search(input.trim())
                /* eslint-enable */
                ) });
        };

        _this.rootNode = new RootNode(_this._props, {
            onSelect: _this.props.onSelect,
            onDrag: _this.props.dragndrop && _this.props.dragndrop.drag,
            onDrop: _this.props.dragndrop && _this.props.dragndrop.drop,
            onCancel: _this.props.dragndrop && _this.props.dragndrop.cancel
        }, _this._state, _this.forceUpdate);
        if (props.keyDownListener) props.keyDownListener.subscribe(_this.rootNode.onKey);
        if (props.keyUpListener) props.keyUpListener.subscribe(_this.rootNode.onKey);
        return _this;
    }

    /* Events */

    _createClass(TreeViewBaseClass, [{
        key: "render",


        /* Rendering */

        value: function render() {
            var sort = this.props.sort;

            var _props = this.props,
                onSelect = _props.onSelect,
                rest = _objectWithoutProperties(_props, ["onSelect"]);

            var props = _extends({}, defaults, rest);

            var searchBar = !this.props.search ? null : React.createElement("input", { type: "search", className: this.rootNode.mixCss("search"),
                value: this.state.search,
                placeholder: this.props.labels && this.props.labels["search.placeholder"],
                onChange: this.onSearch });

            return React.createElement(
                "div",
                { className: this.rootNode.mixCss("TreeView") },
                searchBar,
                React.createElement(TreeViewNode, _extends({}, props, {
                    model: sort ? this.props.model.sort(sort) : this.props.model,
                    filteredModel: this.state.filtered,
                    onSelect: this.rootNode.onSelect,
                    dragndrop: this.rootNode.wrapDragNDrop(),
                    ancestors: [],
                    sort: sort,
                    folded: false,
                    searched: !!this.state.search.trim() }))
            );
        }
    }]);

    return TreeViewBaseClass;
}(React.PureComponent);

export var TreeView = combine(withLabels(defaults.labels), withListener({ eventType: "keyup", propName: "keyUpListener", autoMount: true }), withListener({ eventType: "keydown", propName: "keyDownListener", autoMount: true }))(TreeViewBaseClass);
//# sourceMappingURL=TreeView.js.map