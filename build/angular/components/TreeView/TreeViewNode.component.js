import { Component, Input, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef, ComponentFactoryResolver } from "@angular/core";
import { ItemInjector } from "./ItemInjector.directive";
import { TreeNode } from "@bosket/core";
var object = require("../../../tools/objects").object;
var TreeViewNode = (function () {
    function TreeViewNode(_cdRef, _componentFactoryResolver) {
        var _this = this;
        this._cdRef = _cdRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.keys = [
            "model", "category", "selection", "display", "key", "strategies", "dragndrop",
            "labels", "sort", "disabled", "openerOpts", "async", "css", "folded",
            "loading", "depth", "ancestors", "searched", "onSelect"
        ];
        this.openerOpts = {
            position: "none"
        };
        this.depth = 0;
        this.ancestorsMap = new Map();
        this._props = {
            memoized: null,
            update: function () {
                var props = {};
                _this.keys.forEach(function (key) {
                    props[key] = _this[key];
                });
                _this._props.memoized = props;
            },
            get: function () { return _this._props.memoized || _this._props.update() && _this._props.memoized; },
            set: function (s) {
                for (var key in s) {
                    if (key in _this)
                        _this[key] = s[key];
                }
            }
        };
        this._state = {
            unfolded: [],
            get: function () { return ({ unfolded: _this._state.unfolded }); },
            set: function (s) {
                for (var key in s) {
                    if (key in _this._state)
                        _this._state[key] = s[key];
                }
            }
        };
        this.node = new TreeNode(this._props, null, this._state, function () { return _this._cdRef.detectChanges(); });
    }
    TreeViewNode.prototype.ngOnChanges = function () { this._props.update(); };
    TreeViewNode.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.model instanceof Array)
            this.model.forEach(function (i) { return _this.ancestorsMap.set(i, _this.ancestors.concat([i])); });
    };
    TreeViewNode.prototype.getModel = function () {
        var _this = this;
        return this.searched ?
            this.model.filter(function (m) { return _this.filteredModel.has(m); }) :
            this.model;
    };
    TreeViewNode.prototype.getChildModel = function (item) {
        var childModel = item[this.category];
        if (this.node.isAsync(item) && !this.node.isFolded(item) && this.node.pending.indexOf(item) < 0) {
            this.node.unwrapPromise(item);
        }
        if (!this.node.isAsync(item)) {
            childModel = this.sort ? childModel.sort(this.sort) : childModel;
        }
        return childModel;
    };
    TreeViewNode.prototype.getChildFiltered = function (item) {
        return this.searched ?
            this.filteredModel.get(item) :
            null;
    };
    TreeViewNode.prototype.getAncestors = function (item) {
        if (!this.ancestorsMap.has(item))
            this.ancestorsMap.set(item, this.ancestors.concat([item]));
        return this.ancestorsMap.get(item);
    };
    TreeViewNode.prototype.invokeEvent = function (name, item, event, condition) {
        if (condition === void 0) { condition = true; }
        var fun = this.node.getDragEvents(item, condition)[name];
        fun ? fun(event) : null;
    };
    TreeViewNode.prototype.renderOpener = function (item, position) {
        return (this.node.hasChildren(item) || this.node.isAsync(item)) &&
            this.openerOpts.position === position;
    };
    TreeViewNode.decorators = [
        { type: Component, args: [{
                    selector: 'TreeViewNode',
                    template: "\n        <ul *ngIf=\"!folded && !loading\"\n            [ngClass]=\"node.ulCss()\"\n            (dragover)=\"invokeEvent('onDragOver', null, $event, !depth)\"\n            (dragenter)=\"invokeEvent('onDragEnter', null, $event, !depth)\"\n            (dragleave)=\"invokeEvent('onDragLeave', null, $event, !depth)\"\n            (drop)=\"invokeEvent('onDrop', null, $event, !depth)\">\n\n            <li *ngFor=\"let item of getModel(); let i = index; trackBy: key\"\n                [class]=\"node.liCss(item)\"\n                [draggable]=\"node.getDragEvents(item).draggable\"\n                (dragstart)=\"invokeEvent('onDragStart', item, $event)\"\n                (dragover)=\"invokeEvent('onDragOver', item, $event)\"\n                (dragenter)=\"invokeEvent('onDragEnter', item, $event)\"\n                (dragleave)=\"invokeEvent('onDragLeave', item, $event)\"\n                (dragend)=\"invokeEvent('onDragEnd', item, $event)\"\n                (drop)=\"invokeEvent('onDrop', item, $event)\">\n                <span [class]=\"node.mixCss('item')\" (click)=\"node.onClick(item)($event)\">\n                    <span *ngIf=\"renderOpener(item, 'left')\"\n                        [class]=\"node.mixCss('opener')\"\n                        (click)=\"node.onOpener(item)($event)\"></span>\n                    <ng-container *ngIf=\"!displayComponent\">{{ display(item, _props.get()) }}</ng-container>\n                    <ng-template *ngIf=\"displayComponent\" [itemInjector]=\"item\" [inject]=\"displayComponent\" [inputs]=\"_props.get()\"></ng-template>\n                    <span *ngIf=\"renderOpener(item, 'right')\"\n                        [class]=\"node.mixCss('opener')\"\n                        (click)=\"node.onOpener(item)($event)\"></span>\n                </span>\n                <TreeViewNode\n                    *ngIf=\"node.hasChildren(item) || node.isAsync(item)\"\n                    [model]=\"getChildModel(item)\"\n                    [filteredModel]=\"getChildFiltered(item)\"\n                    [ancestors]=\"getAncestors(item)\"\n                    [depth]=\"depth + 1\"\n                    [folded]=\"node.isFolded(item)\"\n                    [loading]=\"node.isAsync(item) && !node.isFolded(item)\"\n                    [category]=\"category\"\n                    [selection]=\"selection\"\n                    [onSelect]=\"onSelect\"\n                    [strategies]=\"strategies\"\n                    [labels]=\"labels\"\n                    [display]=\"display\"\n                    [displayComponent]=\"displayComponent\"\n                    [css]=\"css\"\n                    [async]=\"async\"\n                    [dragndrop]=\"dragndrop\"\n                    [sort]=\"sort\"\n                    [disabled]=\"disabled\"\n                    [searched]=\"searched\"\n                    [openerOpts]=\"openerOpts\">\n                </TreeViewNode>\n            </li>\n        </ul>\n        <span *ngIf=\"loading\"></span>\n    ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    TreeViewNode.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: ComponentFactoryResolver, },
    ]; };
    TreeViewNode.propDecorators = {
        'model': [{ type: Input },],
        'category': [{ type: Input },],
        'selection': [{ type: Input },],
        'display': [{ type: Input },],
        'key': [{ type: Input },],
        'strategies': [{ type: Input },],
        'labels': [{ type: Input },],
        'sort': [{ type: Input },],
        'disabled': [{ type: Input },],
        'openerOpts': [{ type: Input },],
        'async': [{ type: Input },],
        'displayComponent': [{ type: Input },],
        'dragndrop': [{ type: Input },],
        'filteredModel': [{ type: Input },],
        'css': [{ type: Input },],
        'folded': [{ type: Input },],
        'loading': [{ type: Input },],
        'depth': [{ type: Input },],
        'ancestors': [{ type: Input },],
        'searched': [{ type: Input },],
        'onSelect': [{ type: Input },],
        'itemInjectors': [{ type: ViewChildren, args: [ItemInjector,] },],
    };
    return TreeViewNode;
}());
export { TreeViewNode };
//# sourceMappingURL=TreeViewNode.component.js.map