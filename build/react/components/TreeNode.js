var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { array } from "../../tools";
import { withTransition } from "../traits";
import { TreeNode } from "../../core";

/* Node component */

var TreeViewNodeBaseClass = function (_React$PureComponent) {
    _inherits(TreeViewNodeBaseClass, _React$PureComponent);

    function TreeViewNodeBaseClass(props) {
        _classCallCheck(this, TreeViewNodeBaseClass);

        var _this = _possibleConstructorReturn(this, (TreeViewNodeBaseClass.__proto__ || Object.getPrototypeOf(TreeViewNodeBaseClass)).call(this, props));

        _this.state = {
            unfolded: []
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
                return _this.props;
            }
        };

        _this.renderSubtree = function (item) {
            if (!_this.node.hasChildren(item) && !_this.node.isAsync(item)) return null;

            var childModel = item[_this.props.category];
            var filteredModel = null;

            /* If data has to be retrieved asynchronously */
            if (_this.node.isAsync(item) && !_this.node.isFolded(item) && !array(_this.node.pending).contains(item)) {
                _this.node.unwrapPromise(item);
            }
            if (!_this.node.isAsync(item)) {
                childModel = _this.props.sort ? childModel.sort(_this.props.sort) : childModel;
            }
            if (_this.props.filteredModel) {
                filteredModel = _this.props.filteredModel.get(item);
            }

            return React.createElement(TreeViewNode, _extends({}, _this.props, {
                model: childModel,
                filteredModel: filteredModel,
                ancestors: [].concat(_toConsumableArray(_this.props.ancestors), [item]),
                depth: (_this.props.depth || 0) + 1,
                folded: _this.node.isFolded(item),
                loading: _this.node.isAsync(item) && !_this.node.isFolded(item) }));
        };

        _this.renderOpener = function (item, OpenerComponent) {
            return (_this.node.hasChildren(item) || _this.node.isAsync(item)) && !_this.props.noOpener ? React.createElement(OpenerComponent, { className: _this.node.mixCss("opener"), onClick: _this.node.onOpener(item) }) : null;
        };

        _this.node = new TreeNode(_this._props, null, _this._state, function () {
            if (!_this._unmounted) _this.forceUpdate();
        });
        return _this;
    }

    /* Lifecycle & data */

    _createClass(TreeViewNodeBaseClass, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._unmounted = true;
        }

        /* Rendering */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                model = _props.model,
                folded = _props.folded,
                display = _props.display,
                key = _props.key,
                loading = _props.loading;


            if (folded) return null;

            /* If data has to be retrieved asynchronously */
            if (loading) {
                return React.createElement("span", null);
            }

            var OpenerComponent = this.props.opener || "span";
            var list = model.filter(function (m) {
                return !_this2.props.searched || _this2.props.filteredModel.has(m);
            }).map(function (item, idx) {
                return React.createElement(
                    "li",
                    _extends({ key: key && key(item) || idx,
                        className: _this2.node.liCss(item),
                        onClick: _this2.node.onClick(item)
                    }, _this2.node.getDragEvents(item)),
                    React.createElement(
                        "span",
                        { className: _this2.node.mixCss("item") },
                        display(item, _this2.props.ancestors),
                        _this2.renderOpener(item, OpenerComponent)
                    ),
                    _this2.renderSubtree(item)
                );
            });

            return React.createElement(
                "ul",
                _extends({ className: this.node.ulCss()
                }, this.node.getDragEvents(null, this.props.dragndrop.draggable && !this.props.depth)),
                list
            );
        }
    }]);

    return TreeViewNodeBaseClass;
}(React.PureComponent);

export var TreeViewNode = withTransition({ key: function key(props) {
        return props.folded || props.loading;
    } })(TreeViewNodeBaseClass);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TreeViewNodeBaseClass, "TreeViewNodeBaseClass", "src/react/components/TreeNode.js");

    __REACT_HOT_LOADER__.register(TreeViewNode, "TreeViewNode", "src/react/components/TreeNode.js");
}();

;
//# sourceMappingURL=TreeNode.js.map