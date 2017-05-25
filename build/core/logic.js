var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { css, array, tree } from "../tools";
import { selectionStrategies, foldStrategies, clickStrategies } from "./strategies";
import { defaults } from "./defaults";

/* Boilerplate  for framework class adapters */

var Core = function Core(inputs, outputs, state, refresh) {
    _classCallCheck(this, Core);

    this.inputs = inputs;
    this.outputs = outputs;
    this.state = state;
    this.refresh = refresh;
};

/* A tree node */


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
            return (!_this.inputs.get().searched || _this.isAsync(item)) && (_this.inputs.get().strategies.fold || []).map(function (strat) {
                return (foldStrategies[strat] || strat).bind(_this);
            }).reduce(function (last, curr) {
                return last && curr(item, last);
            }, true);
        }, _this.hasChildren = function (item) {
            return item[_this.inputs.get().category] && item[_this.inputs.get().category] instanceof Array;
        }, _this.isAsync = function (item) {
            return item[_this.inputs.get().category] && typeof item[_this.inputs.get().category] === "function";
        }, _this.isDisabled = function (item) {
            return _this.inputs.get().disabled && _this.inputs.get().disabled(item);
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
            return _this.inputs.get().async(item[_this.inputs.get().category]).then(function (res) {
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
                (_this.inputs.get().strategies.click || []).map(function (strat) {
                    return (clickStrategies[strat] || strat).bind(_this);
                }).forEach(function (strat) {
                    return strat(item, event, _this.inputs.get().ancestors, _this.inputs.get().model);
                });
                _this.inputs.get().onSelect(item, _this.inputs.get().ancestors, _this.inputs.get().model);
                event.stopPropagation();
            };
        }, _this.onOpener = function (item) {
            return function (event) {
                var newVal = _this.state.get().unfolded.filter(function (i) {
                    return i !== item;
                });
                if (newVal.length === _this.state.get().unfolded.length) newVal.push(item);
                _this.state.set({ unfolded: newVal });
                event.stopPropagation();
            };
        }, _this.onDragStart = function (item) {
            return function (event) {
                event.stopPropagation();
                _this.inputs.get().dragndrop.dragStart(item, event, _this.inputs.get().ancestors, _this.inputs.get().model);
            };
        }, _this.onDragOver = function (item) {
            return function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (_this.dragGuard(item, event)) {
                    event.dataTransfer.dropEffect = "none";
                    css.addClass(event.currentTarget, _this.mixCss("nodrop"));
                    return;
                }

                css.addClass(event.currentTarget, _this.mixCss("dragover"));
            };
        }, _this.onDragEnter = function (item) {
            return function (event) {
                event.preventDefault();
                event.stopPropagation();
                // If dragging over an opener
                if (item && !_this.dragGuard(item, event) && (_this.hasChildren(item) || _this.isAsync(item)) && css.hasClass(event.target, _this.mixCss("opener"))) {
                    var newVal = _this.state.get().unfolded.filter(function (i) {
                        return i !== item;
                    });
                    newVal.push(item);
                    _this.state.set({ unfolded: newVal });
                }
            };
        }, _this.onDragLeave = function (event) {
            event.stopPropagation();
            css.removeClass(event.currentTarget, _this.mixCss("dragover"));
            css.removeClass(event.currentTarget, _this.mixCss("nodrop"));
        }, _this.onDrop = function (item) {
            return function (event) {
                event.stopPropagation();
                css.removeClass(event.currentTarget, _this.mixCss("dragover"));
                css.removeClass(event.currentTarget, _this.mixCss("nodrop"));
                if (_this.dragGuard(item, event)) return;
                var target = item ? _this.hasChildren(item) ? item : array(_this.inputs.get().ancestors).last() : null;
                _this.inputs.get().dragndrop.onDrop(target, event);
            };
        }, _this.dragGuard = function (item, event) {
            // Prevent drop when not droppable
            if (!_this.isDroppable(item)) return false;
            // If we are dragging files authorize drop
            var items = event.dataTransfer.items;
            if (items && items.length > 0 && items[0].kind === "file") return false;
            // Prevent drop on self
            var selfDrop = item && array(_this.inputs.get().selection).contains(item);
            // Prevent drop on child
            var childDrop = _this.inputs.get().ancestors && _this.inputs.get().ancestors.reduce(function (prev, curr) {
                return prev || array(_this.inputs.get().selection).contains(curr);
            }, false);

            return selfDrop || childDrop;
        }, _this.getDragEvents = function (item) {
            var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!condition) return {};
            var result = {
                draggable: _this.isDraggable(item),
                onDragStart: _this.isDraggable(item) && _this.onDragStart(item).bind(_this),
                onDragOver: _this.onDragOver(item).bind(_this),
                onDragEnter: _this.onDragEnter(item).bind(_this),
                onDragLeave: _this.onDragLeave.bind(_this),
                onDrop: _this.isDroppable(item) && _this.onDrop(item).bind(_this)
            };
            for (var key in result) {
                if (!result[key]) delete result[key];
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


    // On opener click


    // Drag'n'drop //

    // Guard against bad drop


    return TreeNode;
}(Core);

/* Root node of the tree */
export var RootNode = function (_Core2) {
    _inherits(RootNode, _Core2);

    function RootNode() {
        var _ref2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, RootNode);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = RootNode.__proto__ || Object.getPrototypeOf(RootNode)).call.apply(_ref2, [this].concat(args))), _this2), _this2.modifiers = {}, _this2.onKey = function (event) {
            this.modifiers = {
                control: event.getModifierState("Control"),
                meta: event.getModifierState("Meta"),
                shift: event.getModifierState("Shift")
            };
        }.bind(_this2), _this2.onSelect = function (item, ancestors, neighbours) {
            var _this3 = this;

            var selectionStrategy = this.inputs.get().strategies.selection || [];
            var newSelection = selectionStrategy.map(function (strat) {
                return (selectionStrategies[strat] || strat).bind(_this3);
            }).reduce(function (last, curr) {
                return curr(item, last, neighbours, ancestors);
            }, this.inputs.get().selection);
            return this.outputs.onSelect(newSelection);
        }.bind(_this2), _this2.onDragStart = function (target, event, ancestors, neighbours) {
            event.dataTransfer.setData("application/json", JSON.stringify(target));
            event.dataTransfer.dropEffect = "move";

            if (!array(this.inputs.get().selection).contains(target)) {
                this.onSelect(target, ancestors, neighbours);
            }
            this.outputs.onDrag(target, event, ancestors, neighbours);
        }.bind(_this2), _this2.onDrop = function (target, event) {
            event.preventDefault();
            var jsonData = event.dataTransfer.getData("application/json");

            this.outputs.onDrop(target, jsonData ? JSON.parse(jsonData) : null, event);
        }.bind(_this2), _this2.wrapDragNDrop = function () {
            return _extends({}, _this2.inputs.get().dragndrop, {
                dragStart: _this2.onDragStart,
                onDrop: _this2.onDrop
            });
        }, _this2.mixCss = function (prop) {
            return _this2.inputs.get().css[prop] || defaults.css[prop];
        }, _this2.filterTree = function (input) {
            return !input.trim() ? null : tree(_this2.inputs.get().model, _this2.inputs.get().category).treeFilter(_this2.inputs.get().search(input.trim()));
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    /* Events */

    // Keyboard modifiers list


    // When new element(s) are selected


    // Drag start


    // Drop event


    // Framework input wrapper


    // Css mixin helper


    // Filters the tree on a search


    return RootNode;
}(Core);
;

var _temp3 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Core, "Core", "src/core/logic.js");

    __REACT_HOT_LOADER__.register(TreeNode, "TreeNode", "src/core/logic.js");

    __REACT_HOT_LOADER__.register(RootNode, "RootNode", "src/core/logic.js");
}();

;
//# sourceMappingURL=logic.js.map