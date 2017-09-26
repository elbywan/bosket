import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { RootNode, defaults } from "../../../core";
var TreeView = (function () {
    function TreeView(cdRef) {
        var _this = this;
        this.cdRef = cdRef;
        this.display = defaults.display;
        this.key = function (idx, item) { return "" + idx; };
        this.strategies = defaults.strategies;
        this.labels = defaults.labels;
        this.css = defaults.css;
        this.noOpener = defaults.noOpener;
        this.async = defaults.async;
        this._dragndrop = defaults.dragndrop;
        this.selectionChange = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.onOver = new EventEmitter();
        this.onEnter = new EventEmitter();
        this.onLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.getChildModel = function () {
            return _this.sort ? _this.model.sort(_this.sort) : _this.model;
        };
        this.onSearch = function (query) {
            _this._state.set({
                search: query,
                filtered: _this.rootNode.filterTree(query)
            });
        };
        this._props = {
            get: function () {
                var keys = ["model", "category", "selection", "display", "search", "async", "key",
                    "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener"];
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
            onDrag: function (target, event, inputs) { return _this.onDrag.emit({ target: target, event: event, inputs: inputs }); },
            onEnter: function (target, event, inputs) { return _this.onEnter.emit({ target: target, event: event, inputs: inputs }); },
            onOver: function (target, event, inputs) { return _this.onOver.emit({ target: target, event: event, inputs: inputs }); },
            onLeave: function (target, event, inputs) { return _this.onLeave.emit({ target: target, event: event, inputs: inputs }); },
            onDrop: function (target, event, inputs) { return _this.onDrop.emit({ target: target, event: event, inputs: inputs }); },
            onCancel: function (target, event, inputs) { return _this.onCancel.emit({ target: target, event: event, inputs: inputs }); }
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
        this.rootNode = new RootNode(this._props, this._outputs, this._state, this.cdRef.detectChanges);
    }
    Object.defineProperty(TreeView.prototype, "dragndrop", {
        get: function () { return this._dragndrop; },
        set: function (d) { this._dragndrop = d; this._dragndrop = this.rootNode.wrapDragNDrop(); },
        enumerable: true,
        configurable: true
    });
    TreeView.decorators = [
        { type: Component, args: [{
                    selector: 'TreeView',
                    template: "\n        <div [class]=\"rootNode.mixCss('TreeView')\">\n                <input #searchBox\n                    *ngIf=\"search\"\n                    type=\"search\"\n                    [class]=\"rootNode.mixCss('search')\"\n                    [placeholder]=\"labels['search.placeholder']\"\n                    (input)=\"onSearch(searchBox.value)\" />\n                <TreeViewNode\n                    [model]=\"getChildModel()\"\n                    [filteredModel]=\"_state.filtered\"\n                    [category]=\"category\"\n                    [selection]=\"selection\"\n                    [onSelect]=\"rootNode.onSelect\"\n                    [strategies]=\"strategies\"\n                    [display]=\"display\"\n                    [displayComponent]=\"displayComponent\"\n                    [key]=\"key\"\n                    [css]=\"css\"\n                    [dragndrop]=\"dragndrop\"\n                    [async]=\"async\"\n                    [ancestors]=\"[]\"\n                    [sort]=\"sort\"\n                    [disabled]=\"disabled\"\n                    [searched]=\"_state.search.trim()\"\n                    [noOpener]=\"noOpener\"\n                    [labels]=\"labels\">\n                </TreeViewNode>\n            </div>\n    ",
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
        'displayComponent': [{ type: Input },],
        'key': [{ type: Input },],
        'search': [{ type: Input },],
        'strategies': [{ type: Input },],
        'labels': [{ type: Input },],
        'css': [{ type: Input },],
        'sort': [{ type: Input },],
        'disabled': [{ type: Input },],
        'noOpener': [{ type: Input },],
        'async': [{ type: Input },],
        'dragndrop': [{ type: Input },],
        'selectionChange': [{ type: Output },],
        'onDrag': [{ type: Output },],
        'onOver': [{ type: Output },],
        'onEnter': [{ type: Output },],
        'onLeave': [{ type: Output },],
        'onDrop': [{ type: Output },],
        'onCancel': [{ type: Output },],
    };
    return TreeView;
}());
export { TreeView };
//# sourceMappingURL=TreeView.component.js.map