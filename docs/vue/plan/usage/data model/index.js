import { jscode } from "self/vue/tools"
import SampleTree from "./sample.vue"

export default {
    title: "Data model",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/data%20model/index.js",
    content: h =>
        <span>
            <p>To populate the component you need to provide a suitable data model.</p>
            { jscode`
                // A model is simply an array of objects.

                const model = [{
                    a: 1,
                    b: 2,
                    /* ... */
                    // If the object has 'children', it must contain a property value
                    // being an array of objects that respects the same contract.
                    // 'children' is just a placeholer name, you can use and specify any
                    // label as a prop of the component.
                    children: [{
                        /* ... */,
                        // If you would like the children to be loaded asynchronously when
                        // the node is unfolded, you may use a function returning a Promise.
                        children: () => {
                            return new Promise(resolve =>
                                setTimeout(() =>
                                    // resolves into the children model
                                    resolve([{ a: 1, b: 2 }]), 1000))
                        }
                    }],
                },
                /* ... */
                ]`(h) }

            <p>The logic is pretty simple as you can see below, a model and its tree representation as a Bosket view :</p>

            { jscode`
            [
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
            ]`(h) }

            <div style={ { border: "2px solid black", cursor: "pointer" } }>
                <SampleTree/>
            </div>
        </span>
}
