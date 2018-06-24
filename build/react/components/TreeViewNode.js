var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { array } from "@bosket/tools";
import { TreeNode } from "@bosket/core";
import { withTransition } from "../traits";

/* Node component */
var TreeViewNodeBaseClass = function (_React$PureComponent) {
    _inherits(TreeViewNodeBaseClass, _React$PureComponent);

    /* Lifecycle & data */
    function TreeViewNodeBaseClass(props) {
        _classCallCheck(this, TreeViewNodeBaseClass);

        var _this = _possibleConstructorReturn(this, (TreeViewNodeBaseClass.__proto__ || Object.getPrototypeOf(TreeViewNodeBaseClass)).call(this, props));

        _this.ancestorsMap = new Map();
        _this.state = {
            unfolded: []
        };


        var _props = {
            get: function get() {
                return _this.props;
            }
        };
        var _state = {
            get: function get() {
                return _this.state;
            },
            set: function set(s) {
                return _this.setState(s);
            }
        };

        _this.node = new TreeNode(_props, {}, _state, function () {
            if (!_this._unmounted) _this.forceUpdate();
        });

        if (_this.props.model instanceof Array) {
            _this.props.model.forEach(function (item) {
                return item && _this.ancestorsMap.set(item, [].concat(_toConsumableArray(_this.props.ancestors), [item]));
            });
        }
        return _this;
    }

    _createClass(TreeViewNodeBaseClass, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._unmounted = true;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (this.props.model !== nextProps.model) {
                if (nextProps.model instanceof Array) {
                    var newMap = new Map();
                    nextProps.model.forEach(function (item) {
                        if (!item) return;
                        var lastVal = _this2.ancestorsMap.get(item);
                        if (lastVal) newMap.set(item, lastVal);else newMap.set(item, [].concat(_toConsumableArray(_this2.props.ancestors), [item]));
                    });
                    this.ancestorsMap = newMap;
                }
            }
        }

        /* Rendering */

    }, {
        key: "renderSubtree",
        value: function renderSubtree(item) {
            if (!this.node.hasChildren(item) && !this.node.isAsync(item)) return null;

            var childModel = item[this.props.category];
            var filteredModel = null;

            /* If data has to be retrieved asynchronously */
            if (this.node.isAsync(item) && !this.node.isFolded(item) && !array(this.node.pending).contains(item)) {
                this.node.unwrapPromise(item);
            }
            if (!this.node.isAsync(item)) {
                childModel = this.props.sort ? childModel.sort(this.props.sort) : childModel;
            }
            if (this.props.filteredModel) {
                filteredModel = this.props.filteredModel.get(item);
            }

            return React.createElement(TreeViewNode, _extends({}, this.props, {
                model: childModel,
                filteredModel: filteredModel,
                ancestors: this.ancestorsMap.get(item) || [],
                depth: (this.props.depth || 0) + 1,
                folded: this.node.isFolded(item),
                loading: this.node.isAsync(item) && !this.node.isFolded(item) }));
        }
    }, {
        key: "renderOpener",
        value: function renderOpener(item, OpenerComponent) {
            var _this3 = this;

            var openerOpts = this.props.openerOpts;


            return function (position) {
                return (_this3.node.hasChildren(item) && item[_this3.props.category].length > 0 || _this3.node.isAsync(item)) && openerOpts.position === position ? React.createElement(OpenerComponent, {
                    className: _this3.node.mixCss("opener"),
                    onClick: _this3.node.onOpener(item, openerOpts.callback)
                }) : null;
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _props2 = this.props,
                model = _props2.model,
                folded = _props2.folded,
                display = _props2.display,
                unique = _props2.unique,
                loading = _props2.loading;


            if (folded) return null;

            /* If data has to be retrieved asynchronously */
            if (loading) {
                return React.createElement("span", null);
            }

            var OpenerComponent = this.props.opener || "span";
            var list = model.filter(function (m) {
                return !_this4.props.searched || _this4.props.filteredModel && _this4.props.filteredModel.has(m);
            }).map(function (item, idx) {
                return React.createElement(
                    "li",
                    _extends({ key: unique && unique(item) || idx,
                        className: _this4.node.liCss(item)
                    }, _this4.node.getDragEvents(item)),
                    React.createElement(
                        "span",
                        { className: _this4.node.mixCss("item"), onClick: _this4.node.onClick(item) },
                        _this4.renderOpener(item, OpenerComponent)("left"),
                        display && display(item, _this4.props),
                        _this4.renderOpener(item, OpenerComponent)("right")
                    ),
                    _this4.renderSubtree(item)
                );
            });

            return React.createElement(
                "ul",
                _extends({ className: this.node.ulCss()
                }, this.node.getDragEvents(null, !this.props.depth)),
                list
            );
        }
    }]);

    return TreeViewNodeBaseClass;
}(React.PureComponent);

export var TreeViewNode = withTransition({ key: function key(props) {
        return props.folded || props.loading;
    } })(TreeViewNodeBaseClass);
//# sourceMappingURL=TreeViewNode.js.map