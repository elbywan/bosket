<data-model-tree>
    <TreeView
        model={ sampleModel }
        category="children"
        selection={ selection }
        onselect={ updateSelection }
        display={ display }>
    </TreeView>

    <script>
        this.sampleModel = [
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

        this.updateSelection = _ => { this.selection = _; this.update() }
        this.selection = []
        this.display = _ => _.label
    </script>
</data-model-tree>
