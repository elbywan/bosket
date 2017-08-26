import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { array, object } from "../../tools";
import { withTransition } from "../traits";
import { TreeNode } from "../../core";

var TreeViewNodeBase = {
    name: "TreeViewNode",
    created: function created() {
        var _this = this;

        var _inputs = { get: function get() {
                return _this.$props;
            } };
        var _state = {
            get: function get() {
                return _this.$data;
            },
            set: function set(s) {
                for (var key in s) {
                    if (key in _this.$data) _this.$data[key] = s[key];
                }
            }
        };
        this.node = new TreeNode(_inputs, {}, _state, function () {
            if (!_this._unmounted) _this.$forceUpdate();
        });
    },
    beforeDestroy: function beforeDestroy() {
        this._unmounted = true;
    },

    props: ["model", "category", "selection", "onSelect", "display", "strategies", "dragndrop", "labels", "sort", "disabled", "noOpener", "async", "css", "folded", "transition", "unique", "loading", "depth", "ancestors", "searched", "onSelect", "filteredModel"],
    data: function data() {
        return {
            unfolded: []
        };
    },
    computed: {
        childrenModel: function childrenModel() {
            var _this2 = this;

            var map = new Map();
            this.$props.model.forEach(function (item) {
                if (_this2.node.hasChildren(item) && !_this2.node.isAsync(item)) map.set(item, _this2.$props.sort ? item[_this2.$props.category].sort(_this2.$props.sort) : item[_this2.$props.category]);
            });
            return map;
        },
        rootDragData: function rootDragData() {
            var rootData = this.node.getDragEvents(null, !this.$props.depth);
            return _extends({
                attrs: { draggable: rootData.draggable }
            }, object(rootData).nestPrefix("on", function (_) {
                return _.toLowerCase();
            }));
        }
    },
    render: function render() {
        var _this3 = this;

        var h = arguments[0];

        var renderSubtree = function renderSubtree(item) {
            if (!_this3.node.hasChildren(item) && !_this3.node.isAsync(item)) return null;

            var filteredModel = null;

            /* If data has to be retrieved asynchronously */
            if (_this3.node.isAsync(item) && !_this3.node.isFolded(item) && !array(_this3.node.pending).contains(item)) {
                _this3.node.unwrapPromise(item);
            }
            if (_this3.$props.filteredModel) {
                filteredModel = _this3.$props.filteredModel.get(item);
            }

            var data = {
                props: _extends({}, _this3.$props, {
                    model: _this3.childrenModel.get(item),
                    filteredModel: filteredModel,
                    ancestors: [].concat(_toConsumableArray(_this3.$props.ancestors), [item]),
                    depth: (_this3.$props.depth || 0) + 1,
                    folded: _this3.node.isFolded(item),
                    loading: _this3.node.isAsync(item) && !_this3.node.isFolded(item)
                })
            };

            return h(
                TreeViewNode,
                data,
                []
            );
        };

        var renderOpener = function renderOpener(item, OpenerComponent) {
            return (_this3.node.hasChildren(item) || _this3.node.isAsync(item)) && !_this3.$props.noOpener ? h(
                OpenerComponent,
                { "class": _this3.node.mixCss("opener"), on: {
                        "click": _this3.node.onOpener(item)
                    }
                },
                []
            ) : null;
        };

        var _$props = this.$props,
            model = _$props.model,
            folded = _$props.folded,
            display = _$props.display,
            loading = _$props.loading;


        if (folded) return null;

        /* If data has to be retrieved asynchronously */
        if (loading) {
            return h(
                "span",
                null,
                []
            );
        }

        var OpenerComponent = this.$props.opener || "span";
        var list = model.filter(function (m) {
            return !_this3.$props.searched || _this3.$props.filteredModel && _this3.$props.filteredModel.has(m);
        }).map(function (item, idx) {
            var rawLiData = _extends({}, _this3.node.getDragEvents(item), {
                "class": _this3.node.liCss(item)
            });
            var liData = _extends({
                attrs: { draggable: rawLiData.draggable }
            }, object(rawLiData).nestPrefix("on", function (_) {
                return _.toLowerCase();
            }));
            if (_this3.$props.unique) liData.key = _this3.$props.unique(item, idx);
            return h(
                "li",
                liData,
                [h(
                    "span",
                    { "class": _this3.node.mixCss("item"), on: {
                            "click": _this3.node.onClick(item)
                        }
                    },
                    [display && display(item, _this3.$props), renderOpener(item, OpenerComponent)]
                ), renderSubtree(item)]
            );
        });

        return h(
            "ul",
            _mergeJSXProps([{ "class": this.node.ulCss() }, this.rootDragData]),
            [list]
        );
    }
};

export var TreeViewNode = withTransition({ key: function key(props) {
        return props.folded || props.loading;
    } })(TreeViewNodeBase);
//# sourceMappingURL=TreeViewNode.js.map