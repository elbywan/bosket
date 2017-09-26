var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    function TreeViewBaseClass(props) {
        _classCallCheck(this, TreeViewBaseClass);

        var _this = _possibleConstructorReturn(this, (TreeViewBaseClass.__proto__ || Object.getPrototypeOf(TreeViewBaseClass)).call(this, props));

        _this.ancestors = [];
        _this.state = {
            search: "",
            filtered: null
        };

        _this.onSearch = function (evt) {
            if (evt.currentTarget instanceof HTMLInputElement) {
                var input = evt.currentTarget.value;
                _this.setState({
                    search: input,
                    filtered: !input.trim() ? null : tree(_this.props.model, _this.props.category)
                    /* eslint-disable */
                    .treeFilter(_this.props.search(input.trim()))
                    /* eslint-enable */
                });
            }
        };

        var _props = {
            get: function get() {
                return _extends({}, defaults, _this.props);
            }
        };
        var _outputs = {
            onSelect: _this.props.onSelect,
            onDrag: _this.props.dragndrop && _this.props.dragndrop.drag,
            onOver: _this.props.dragndrop && _this.props.dragndrop.over,
            onEnter: _this.props.dragndrop && _this.props.dragndrop.enter,
            onLeave: _this.props.dragndrop && _this.props.dragndrop.leave,
            onDrop: _this.props.dragndrop && _this.props.dragndrop.drop,
            onCancel: _this.props.dragndrop && _this.props.dragndrop.cancel
        };
        var _state = {
            get: function get() {
                return _this.state;
            },
            set: function set(s) {
                return _this.setState(s);
            }
        };

        _this.rootNode = new RootNode(_props, _outputs, _state, _this.forceUpdate);

        if (props.keyDownListener) props.keyDownListener.subscribe(_this.rootNode.onKey);
        if (props.keyUpListener) props.keyUpListener.subscribe(_this.rootNode.onKey);
        _this.wrappedDragNDrop = _this.rootNode.wrapDragNDrop();
        return _this;
    }

    /* Events */

    /* Data & lifecycle */


    _createClass(TreeViewBaseClass, [{
        key: "componentWillReceiveProps",


        /* Rendering */

        value: function componentWillReceiveProps(nextProps) {
            var update = false;
            for (var _key in defaults) {
                if (nextProps[_key] !== this.props[_key]) {
                    update = true;
                    break;
                }
            }
            if (update) this.defaultsMix = _extends({}, defaults, nextProps);
        }
    }, {
        key: "render",
        value: function render() {
            var sort = this.props.sort;
            var props = this.defaultsMix || _extends({}, defaults, this.props);

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
                    dragndrop: this.wrappedDragNDrop,
                    ancestors: this.ancestors,
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