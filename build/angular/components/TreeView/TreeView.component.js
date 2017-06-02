import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { RootNode, defaults } from "../../../core";
var TreeView = (function () {
    function TreeView(cdRef) {
        var _this = this;
        this.cdRef = cdRef;
        this._props = {
            get: function () {
                var keys = ["model", "category", "selection", "display", "key", "search",
                    "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener", "async"];
                var props = {};
                keys.forEach(function (key) {
                    props[key] = _this[key];
                });
                return props;
            },
            set: function (s) {
                for (var key in s) {
                    if (key in _this)
                        _this[key] = s[key];
                }
            }
        };
        this._outputs = {
            onSelect: function (selection, item, ancestors, neighbours) { return _this.selectionChange.emit(selection); },
            onDrop: function (target, item, event) { return _this.onDrop.emit([target, item, event]); },
            onDrag: function (target, event, ancestors, neighbours) { return _this.onDrag.emit({ target: target, event: event, ancestors: ancestors, neighbours: neighbours }); }
        };
        this._state = {
            search: "",
            filtered: null,
            get: function () {
                return { search: _this._state.search, filtered: _this._state.filtered };
            },
            set: function (s) {
                for (var key in s) {
                    if (key in _this._state)
                        _this._state[key] = s[key];
                }
            }
        };
        this.display = defaults.display;
        this.key = function (idx, _) { return "" + idx; };
        this.strategies = defaults.strategies;
        this.labels = defaults.labels;
        this.css = defaults.css;
        this.noOpener = defaults.noOpener;
        this.async = defaults.async;
        this._dragndrop = defaults.dragndrop;
        this.selectionChange = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.getChildModel = function () {
            return _this.sort ? _this.model.sort(_this.sort) : _this.model;
        };
        this.onSearch = function (input) {
            _this._state.set({
                search: input,
                filtered: _this.rootNode.filterTree(input)
            });
        };
        this.rootNode = new RootNode(this._props, this._outputs, this._state, this.cdRef.detectChanges);
    }
    Object.defineProperty(TreeView.prototype, "dragndrop", {
        get: function () { return this._dragndrop; },
        set: function (d) { this._dragndrop = d; this._dragndrop = this.rootNode.wrapDragNDrop(); },
        enumerable: true,
        configurable: true
    });
    return TreeView;
}());
export { TreeView };
TreeView.decorators = [
    { type: Component, args: [{
                selector: 'TreeView',
                template: "\n        <div [class]=\"rootNode.mixCss('TreeView')\">\n                <input\n                    *ngIf=\"search\"\n                    type=\"search\"\n                    #searchBox\n                    [class]=\"rootNode.mixCss('search')\"\n                    [placeholder]=\"labels['search.placeholder']\"\n                    (input)=\"onSearch(searchBox.value)\" />\n                <TreeViewNode\n                    [model]=\"getChildModel()\"\n                    [filteredModel]=\"_state.filtered\"\n                    [category]=\"category\"\n                    [selection]=\"selection\"\n                    [onSelect]=\"rootNode.onSelect\"\n                    [strategies]=\"strategies\"\n                    [display]=\"display\"\n                    [css]=\"css\"\n                    [dragndrop]=\"dragndrop\"\n                    [async]=\"async\"\n                    [ancestors]=\"[]\"\n                    [sort]=\"sort\"\n                    [disabled]=\"disabled\"\n                    [searched]=\"_state.search.trim()\"\n                    [itemComponent]=\"itemComponent\">\n                </TreeViewNode>\n            </div>\n    ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '(document:keyup)': 'rootNode.onKey($event)',
                    '(document:keydown)': 'rootNode.onKey($event)'
                }
            },] },
];
TreeView.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
TreeView.propDecorators = {
    'model': [{ type: Input },],
    'category': [{ type: Input },],
    'selection': [{ type: Input },],
    'display': [{ type: Input },],
    'key': [{ type: Input },],
    'search': [{ type: Input },],
    'strategies': [{ type: Input },],
    'labels': [{ type: Input },],
    'css': [{ type: Input },],
    'sort': [{ type: Input },],
    'disabled': [{ type: Input },],
    'noOpener': [{ type: Input },],
    'async': [{ type: Input },],
    'itemComponent': [{ type: Input },],
    'dragndrop': [{ type: Input },],
    'selectionChange': [{ type: Output },],
    'onDrop': [{ type: Output },],
    'onDrag': [{ type: Output },],
};
//# sourceMappingURL=TreeView.component.js.map