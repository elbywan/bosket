var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { object, tree } from "../../tools";
import { RootNode, defaults } from "../../core";
import { TreeViewNode } from "./TreeViewNode";
import { combine, withLabels, withListener } from "../traits";

var TreeViewBase = {
    name: "TreeView",
    props: ["model", "category", "selection", "onSelect", "display", "search", "transition", "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener", "async", "keyUpListener", "keyDownListener", "unique"],
    data: function data() {
        return {
            searchInput: "",
            filtered: null
        };
    },
    methods: {
        onSearch: function onSearch(evt) {
            var input = evt.currentTarget.value;
            this.$data.searchInput = input;
            this.$data.filtered = !input.trim() ? null : tree(this.$props.model, this.$props.category).treeFilter(this.$props.search(input.trim()));
        }
    },
    computed: {
        computedModel: function computedModel() {
            return this.$props.sort ? this.$props.model.sort(this.$props.sort) : this.$props.model;
        },
        wrapDragNDrop: function wrapDragNDrop() {
            return this.rootNode.wrapDragNDrop();
        }
    },
    created: function created() {
        var _this = this;

        var _props = {
            get: function get() {
                return _extends({}, defaults, object(_this.$props).filter(function (prop) {
                    return !!prop;
                }));
            }
        };
        var _outputs = {
            onSelect: this.$props.onSelect,
            onDrag: this.$props.dragndrop && this.$props.dragndrop.drag,
            onOver: this.$props.dragndrop && this.$props.dragndrop.over,
            onEnter: this.$props.dragndrop && this.$props.dragndrop.enter,
            onLeave: this.$props.dragndrop && this.$props.dragndrop.leave,
            onDrop: this.$props.dragndrop && this.$props.dragndrop.drop,
            onCancel: this.$props.dragndrop && this.$props.dragndrop.cancel
        };
        var _state = {
            get: function get() {
                return _extends({}, _this.$data);
            },
            set: function set(s) {
                for (var key in s) {
                    if (key in _this.$data) _this.$data[key] = s[key];
                }
            }
        };
        this.rootNode = new RootNode(_props, _outputs, _state, this.$forceUpdate);
    },
    mounted: function mounted() {
        this.keyUpListener.subscribe(this.rootNode.onKey);
        this.keyDownListener.subscribe(this.rootNode.onKey);
    },
    render: function render() {
        var h = arguments[0];

        var _object$filter = object(this.$props).filter(function (prop) {
            return !!prop;
        }),
            onSelect = _object$filter.onSelect,
            sort = _object$filter.sort,
            model = _object$filter.model,
            rest = _objectWithoutProperties(_object$filter, ["onSelect", "sort", "model"]);

        var data = {
            props: _extends({}, defaults, rest, {
                model: this.computedModel,
                filteredModel: this.$data.filtered,
                onSelect: this.rootNode.onSelect,
                dragndrop: this.wrapDragNDrop,
                ancestors: [],
                sort: sort,
                folded: false,
                searched: !!this.$data.searchInput.trim()
            })
        };

        var searchBar = !this.$props.search ? null : h(
            "input",
            {
                attrs: {
                    type: "search",

                    placeholder: this.$props.labels && this.$props.labels["search.placeholder"]
                },
                "class": this.rootNode.mixCss("search"),
                domProps: {
                    "value": this.$data.searchInput
                },
                on: {
                    "input": this.onSearch
                }
            },
            []
        );

        return h(
            "div",
            { "class": this.rootNode.mixCss("TreeView") },
            [searchBar, h(
                TreeViewNode,
                data,
                []
            )]
        );
    }
};

export var TreeView = combine(withLabels(defaults.labels), withListener({ eventType: "keyup", prop: "keyUpListener", autoMount: true }), withListener({ eventType: "keydown", prop: "keyDownListener", autoMount: true }))(TreeViewBase);
//# sourceMappingURL=TreeView.js.map