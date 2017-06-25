import React from "react"

import { TreeView } from  "bosket/react"

const sampleModel = [
    { label: "Click me, I'm a node.", children: [
        { label: "I am a child." },
        { label: "And also a leaf." }
    ]},
    { label: "I'm a leaf." },
    { label: "I am an asynchronous node, click me and wait one second.", children: () =>
        new Promise(resolve =>
            setTimeout(() =>
                resolve([{ label: "It took exactly one second to fetch me the first time, I am cached afterwards." }]), 1000))
    }
]

export const SampleTree = class extends React.PureComponent {
    state = { selection: []}
    render = () =>
        <TreeView
            model={ sampleModel }
            category="children"
            selection={ this.state.selection }
            onSelect={ _ => this.setState({ selection: _ }) }
            display= { i => i.label }>
        </TreeView>
}
