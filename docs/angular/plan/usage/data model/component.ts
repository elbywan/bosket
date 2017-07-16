import { Component } from "@angular/core"

@Component({
    template: `
         <span>
            <p>
                <em>In order to use a component you will first need to use a specific data model to populate it.</em>
            </p>
            <syntax-highlight language="javascript">
                // A model is simply an array of objects.

                const model = [{{ '{' }}
                    a: 1,
                    b: 2,
                    /* ... */
                    // If the object has 'children', it must contain a property value
                    // being an array of objects that respects the same contract.
                    // 'children' is just a placeholer name, you can use and specify any
                    // label as a prop of the component.
                    children: [{{ '{' }}
                        /* ... */,
                        // If you would like the children to be loaded asynchronously when
                        // the node is unfolded, you may use a function returning a Promise.
                        children: () => {{ '{' }}
                            return new Promise(resolve =>
                                setTimeout(() =>
                                    // resolves into the children model
                                    resolve([{{ '{' }} a: 1, b: 2 }]), 1000))
                        }
                    }],
                },
                /* ... */
                ]
            </syntax-highlight>

            <p>The logic is pretty simple, and below you will find a model and its representation :</p>

             <syntax-highlight language="javascript">
                [
                    {{ '{' }} label: "Click me, I'm a node with two children.", children: [
                        {{ '{' }} label: "I am a childless leaf." },
                        {{ '{' }} label: "I am a also a childless leaf." }
                    ]},
                    {{ '{' }} label: "I'm a leaf, I do not have children." },
                    {{ '{' }} label: "I am an asynchronous node, click me and wait one second.", children: () =>
                        new Promise(resolve =>
                            setTimeout(() =>
                                resolve([{{ '{' }} label: "It took exactly one second to fetch me the first time, I am cached afterwards." }]), 1000))
                    }
                ]
            </syntax-highlight>

            <div style="border: 2px solid black; cursor: pointer;" >
                <data-model-tree></data-model-tree>
            </div>
        </span>
    `
})
export class DataModel {}