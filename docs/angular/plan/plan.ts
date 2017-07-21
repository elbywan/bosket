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
            }
        ]
    },
    {
        title: "TreeView",
        editLink: "https://github.com/elbywan/bosket/edit/master/docs/angular/plan/treeview/component.ts",
        content: components.TreeView,
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
            }
        ]
    }
]
