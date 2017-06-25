// @flow

import React from "react"

import { jscode } from "../../../tools/tools"
import { SampleTree } from "./sample"

export default {
    title: "Data model",
    content:
        <span>
            <p>
                <em>In order to use a component you will first need to use a specific data model to populate it.</em><br/><br/>
                The data model must be a "tree-like" array of javascript objects. Each object is considered to be either a node, if it has children, or a leaf.<br/>
                In case the object is a node, its children must be contained in one of its properties and must respect the same data model.
            </p>
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
                ]`}

            <p>The logic is pretty simple, and below you will find a model and its representation :</p>

            { jscode`
            [
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
            ]` }

            <div style={ { border: "2px solid black", cursor: "pointer" } }>
                <SampleTree></SampleTree>
            </div>
        </span>
}
