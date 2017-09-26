var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { css, array, tree } from "../tools";
import { wrapEvents, nodeEvents } from "./dragndrop";
import { selectionStrategies, foldStrategies, clickStrategies } from "./strategies";
import { defaults } from "./defaults";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
//  Boilerplate  for framework class adapters

var Core = function Core(inputs, outputs, state, refresh) {
    _classCallCheck(this, Core);

    this.inputs = inputs;
    this.outputs = outputs;
    this.state = state;
    this.refresh = refresh;
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// Tree node

export var TreeNode = function (_Core) {
    _inherits(TreeNode, _Core);

    function TreeNode() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TreeNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call.apply(_ref, [this].concat(args))), _this), _this.isSelected = function (item) {
            return array(_this.inputs.get().selection).contains(item);
        }, _this.isFolded = function (item) {
            var strats = _this.inputs.get().strategies;
            return (!_this.inputs.get().searched || _this.isAsync(item)) && (strats && strats.fold || []).map(function (strat) {
                return (foldStrategies[strat] || strat).bind(_this);
            }).reduce(function (last, curr) {
                return last && curr(item, last);
            }, true);
        }, _this.hasChildren = function (item) {
            return item[_this.inputs.get().category] && item[_this.inputs.get().category] instanceof Array;
        }, _this.isAsync = function (item) {
            return !!item && [_this.inputs.get().category] && typeof item[_this.inputs.get().category] === "function";
        }, _this.isDisabled = function (item) {
            var disabledFun = _this.inputs.get().disabled;
            return disabledFun ? disabledFun(item) : false;
        }, _this.isDraggable = function (item) {
            return item && _this.inputs.get().dragndrop.draggable && (typeof _this.inputs.get().dragndrop.draggable === "function" ? _this.inputs.get().dragndrop.draggable(item) : true);
        }, _this.isDroppable = function (item) {
            return _this.inputs.get().dragndrop.droppable && (typeof _this.inputs.get().dragndrop.droppable === "function" ? _this.inputs.get().dragndrop.droppable(item) : true);
        }, _this.mixCss = function (prop) {
            return _this.inputs.get().css[prop] || defaults.css[prop];
        }, _this.ulCss = function () {
            return css.classes(_defineProperty({}, _this.mixCss("depth") + "-" + (_this.inputs.get().depth || 0), true));
        }, _this.liCss = function (item) {
            var _css$classes2;

            return css.classes((_css$classes2 = {}, _defineProperty(_css$classes2, _this.mixCss("selected"), _this.isSelected(item)), _defineProperty(_css$classes2, _this.mixCss("category"), _this.hasChildren(item) || _this.isAsync(item)), _defineProperty(_css$classes2, _this.mixCss("folded"), _this.hasChildren(item) || _this.isAsync(item) ? _this.isFolded(item) : null), _defineProperty(_css$classes2, _this.mixCss("disabled"), _this.isDisabled(item)), _defineProperty(_css$classes2, _this.mixCss("async"), _this.isAsync(item) && _this.isFolded(item)), _defineProperty(_css$classes2, _this.mixCss("loading"), _this.isAsync(item) && !_this.isFolded(item)), _css$classes2));
        }, _this.pending = [], _this.unwrapPromise = function (item) {
            _this.pending.push(item);
            var asyncFun = _this.inputs.get().async;
            if (!asyncFun) return Promise.reject(new Error("Missing async function."));else return asyncFun(item[_this.inputs.get().category]).then(function (res) {
                item[_this.inputs.get().category] = res;
                _this.refresh();
            }).catch(function (err) {
                /* eslint-disable */
                throw err;
                /* eslint-enable */
            }).then(function () {
                return _this.pending = _this.pending.filter(function (e) {
                    return e !== item;
                });
            });
        }, _this.onClick = function (item) {
            return function (event) {
                if (_this.isDisabled(item)) return;
                var strats = _this.inputs.get().strategies;
                (strats && strats.click || []).map(function (strat) {
                    return (clickStrategies[strat] || strat).bind(_this);
                }).forEach(function (strat) {
                    return strat(item, event, _this.inputs.get().ancestors, _this.inputs.get().model);
                });
                _this.inputs.get().onSelect(item, _this.inputs.get().ancestors, _this.inputs.get().model);
                event.stopPropagation();
            };
        }, _this.getDragEvents = function (item) {
            var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!condition) return {};
            var result = {
                draggable: _this.isDraggable(item),
                onDragStart: _this.isDraggable(item) && nodeEvents.onDragStart(item).bind(_this),
                onDragOver: _this.isDroppable(item) && nodeEvents.onDragOver(item).bind(_this),
                onDragEnter: _this.isDroppable(item) && nodeEvents.onDragEnter(item).bind(_this),
                onDragLeave: _this.isDroppable(item) && nodeEvents.onDragLeave(item).bind(_this),
                onDrop: _this.isDroppable(item) && nodeEvents.onDrop(item).bind(_this),
                onDragEnd: _this.isDraggable(item) && nodeEvents.onDragEnd(item).bind(_this)
            };
            for (var _key2 in result) {
                if (!result[_key2]) delete result[_key2];
            }return result;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /* Various checks */

    /* Styles calculation */

    // Css mixin helper


    /* Promises */

    // Pending promises


    // Unwrap a promise and mutate the model to add the results


    /* Events */

    // On item click


    _createClass(TreeNode, [{
        key: "onOpener",


        // On opener click
        value: function onOpener(item) {
            var _this2 = this;

            return function (event) {
                var newVal = _this2.state.get().unfolded.filter(function (i) {
                    return i !== item;
                });
                if (newVal.length === _this2.state.get().unfolded.length) newVal.push(item);
                _this2.state.set({ unfolded: newVal });
                event.stopPropagation();
            };
        }

        // Drag'n'drop //

    }]);

    return TreeNode;
}(Core);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// Root node of the tree

export var RootNode = function (_Core2) {
    _inherits(RootNode, _Core2);

    function RootNode() {
        var _ref2;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, RootNode);

        for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = RootNode.__proto__ || Object.getPrototypeOf(RootNode)).call.apply(_ref2, [this].concat(args))), _this3), _this3.modifiers = {}, _this3.onKey = function (event) {
            _this3.modifiers = {
                control: event.getModifierState("Control"),
                meta: event.getModifierState("Meta"),
                shift: event.getModifierState("Shift")
            };
        }, _this3.onSelect = function (item, ancestors, neighbours) {
            var selectionStrategy = _this3.inputs.get().strategies.selection || [];
            var newSelection = selectionStrategy.map(function (strat) {
                return (selectionStrategies[strat] || strat).bind(_this3);
            }).reduce(function (last, curr) {
                return curr(item, last, neighbours, ancestors);
            }, _this3.inputs.get().selection);
            _this3.outputs.onSelect(newSelection, item, ancestors, neighbours);
            return newSelection;
        }, _this3.wrapDragNDrop = wrapEvents.bind(_this3), _this3.mixCss = function (prop) {
            return _this3.inputs.get().css[prop] || defaults.css[prop];
        }, _this3.filterTree = function (input) {
            var search = _this3.inputs.get().search;
            return !search ? null : !input.trim() ? null : tree(_this3.inputs.get().model, _this3.inputs.get().category).treeFilter(search(input.trim()));
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    /* Events */

    // Keyboard modifiers list


    // When new element(s) are selected


    // Framework input wrapper


    // Css mixin helper


    // Used to filter the tree when performing a search


    return RootNode;
}(Core);
//# sourceMappingURL=logic.js.map