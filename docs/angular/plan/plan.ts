import * as components from "./imports"

export default [
    {
        title: "Introduction",
        content: components.Introduction
    },
    {
        title: "Usage",
        content: components.Usage,
        subs: [
            {
                title: "Import",
                content: components.Import
            },
            {
                title: "Data model",
                content: components.DataModel
            }
        ]
    },
    {
        title: "TreeView",
        content: components.TreeView,
        subs: [
            {
                title: "Basic Usage",
                content: components.TreeViewBasicUsage
            },
            {
                title: "Demo",
                content: components.TreeViewDemo
            }
        ]
    }
]