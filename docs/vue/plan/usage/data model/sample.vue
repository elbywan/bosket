<template>
    <tree-view :model="model" category="children" :selection="selection" :onSelect="onSelect" :display="display" />
</template>

<script>
    import { TreeView } from "@bosket/vue"

    const sampleModel = [
        { label: "Click me, I'm a node with two children.", children: [
            { label: "I am a childless leaf." },
            { label: "I am a also a childless leaf." }
        ]},
        { label: "I'm a leaf, I do not have children." },
        { label: "I am an asynchronous node, click me and wait one second.", children: () =>
            new Promise(resolve =>
                setTimeout(() =>
                    resolve([{ label: "It took exactly one second to fetch me the first time, I am cached afterwards." }]), 1000))
        }
    ]

    export default {
        name: "SampleTree",
        data: () => ({
            model: sampleModel,
            selection: []
        }),
        methods: {
            onSelect(s) { this.selection = s },
            display: i => i.label
        },
        components: { "tree-view": TreeView }
    }
</script>
