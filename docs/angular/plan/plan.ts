import * as components from "./imports"

export default [
    {
        title: "Introduction",
        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/introduction/component.ts",
        content: components.Introduction
    },
    {
        title: "Usage",
        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/usage/component.ts",
        content: components.Usage,
        subs: [
            {
                title: "Import",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/usage/import/component.ts",
                content: components.Import
            },
            {
                title: "Data model",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/usage/data%20model/component.ts",
                content: components.DataModel
            },
            {
                title: "Style",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/usage/style/component.ts",
                content: components.Style
            }
        ]
    },
    {
        title: "TreeView",
        // editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/component.ts",
        // content: components.TreeView,
        subs: [
            {
                title: "Basic Usage",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/basic%20usage/component.ts",
                content: components.TreeViewBasicUsage
            },
            {
                title: "Demo",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/demo/component.ts",
                content: components.TreeViewDemo
            },
            {
                title: "Required properties",
                subs: [
                    {
                        title: "model",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/required-properties/model/component.ts",
                        content: components.ModelProp
                    },
                    {
                        title: "category",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/required-properties/category/component.ts",
                        content: components.CategoryProp
                    },
                    {
                        title: "selection",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/required-properties/selection/component.ts",
                        content: components.SelectionProp
                    }
                ]
            },
            {
                title: "Optional properties",
                subs: [
                    {
                        title: "display",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/display/component.ts",
                        content: components.DisplayProp
                    },
                    {
                        title: "displayComponent",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/displayComponent/component.ts",
                        content: components.DisplayComponentProp
                    },
                    {
                        title: "key",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/key/component.ts",
                        content: components.KeyProp
                    },
                    {
                        title: "strategies",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/strategies/component.ts",
                        content: components.StrategiesProp
                    },
                    {
                        title: "sort",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/sort/component.ts",
                        content: components.SortProp
                    },
                    {
                        title: "disabled",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/disabled/component.ts",
                        content: components.DisabledProp
                    },
                    {
                        title: "search",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/search/component.ts",
                        content: components.SearchProp
                    },
                    {
                        title: "async",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/async/component.ts",
                        content: components.AsyncProp
                    },
                    {
                        title: "dragndrop",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/dragndrop/component.ts",
                        content: components.DragndropProp
                    },
                    {
                        title: "onDrag",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onDrag/component.ts",
                        content: components.OnDragProp
                    },
                    {
                        title: "onOver",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onOver/component.ts",
                        content: components.OnOverProp
                    },
                    {
                        title: "onEnter",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onEnter/component.ts",
                        content: components.OnEnterProp
                    },
                    {
                        title: "onLeave",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onLeave/component.ts",
                        content: components.OnLeaveProp
                    },
                    {
                        title: "onDrop",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onDrop/component.ts",
                        content: components.OnDropProp
                    },
                    {
                        title: "onCancel",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/onCancel/component.ts",
                        content: components.OnCancelProp
                    },
                    {
                        title: "noOpener",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/noOpener/component.ts",
                        content: components.NoOpenerProp
                    },
                    {
                        title: "labels",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/labels/component.ts",
                        content: components.LabelsProp
                    },
                    {
                        title: "css",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/optional-properties/css/component.ts",
                        content: components.CssProp
                    }
                ]
            },
            {
                title: "Css",
                editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/css/component.ts",
                content: components.TreeViewCss,
                subs: [
                    {
                        title: "Layout",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/css/layout/component.ts",
                        content: components.TreeViewLayout
                    },
                    {
                        title: "Empty stylesheet",
                        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/css/empty-stylesheet/component.ts",
                        content: components.TreeViewEmptyStylesheet
                    }
                ]
            },
        ]
    }
]
