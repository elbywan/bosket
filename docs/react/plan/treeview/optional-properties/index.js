// @flow

import React from "react"

import { jscode } from "self/react/tools"
import dragndrop from "./dragndrop"
import strategies from "./strategies"

export default {
    title: "Optional props",
    subs: [
        {
            title: "display",
            content:
                <div className="marged">
                    <p>
                        A custom rendering function.
                    </p>
                    <div className="emphasis">
                        Defaults to the&nbsp;
                        <em><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" target="_blank" rel="noopener noreferrer">toString</a></em>&nbsp;
                        function.

                        { jscode`
                            display: _ => _.toString()` }
                    </div>
                    { jscode`
                    // The display function is run for every item in the model
                    // Here we wrap the items in an anchor, display the label property and add an extra exclamation mark.
                    const display =  (item, ancestors) =>
                        <a href={ item.link }>{ item.label } !</a>

                    <TreeView
                        /* ... */
                        display={ display }>
                    </TreeView>` }
                </div>
        },
        {
            title: "key",
            content:
                <div className="marged">
                    <p>
                        A function returning a unique <em><a href="https://facebook.github.io/react/docs/lists-and-keys.html#keys" target="_blank" rel="noopener noreferrer">key</a></em> used by React to perform list updates.<br/>
                    </p>
                    <div className="emphasis">
                         Defaults to the index of the item in the list.
                    </div>
                    { jscode`
                    const key = item => item.id

                    <TreeView /* ... */ key={ key }></TreeView>` }
                </div>
        },
        strategies,
        {
            title: "sort",
            content:
                <div className="marged">
                    <p>A custom sorting function.</p>
                    { jscode`
                        const sort = (a, b) => a.label.localeCompare(b.label)

                        <TreeView /* ... */ sort={ sort }></TreeView>` }
                </div>
        },
        {
            title: "disabled",
            content:
                <div className="marged">
                    <p>A disable function, which prevents selection and apply the css 'disabled'' class.</p>
                    { jscode`
                        // Disable elements having children
                        const disabled = item => !!item.children

                        <TreeView /* ... */ disabled={ disabled }></TreeView>` }
                </div>
        },
        {
            title: "search",
            content:
                <div className="marged">
                    <p>A search function which enables the built-in search bar.</p>
                    { jscode`
                        const search = input => item => item.label.match(new RegExp(\`.*\${ input }.*\`, "gi"))

                        <TreeView /* ... */ search={ search }></TreeView>` }
                </div>
        },
        {
            title: "async",
            content:
                <div className="marged">
                    <p>A function used to unwrap <em><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise" target="_blank" rel="noopener noreferrer">Promises</a></em> in case of asynchronous children.</p>

                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            _ => _()` }
                    </div>

                    { jscode`
                        const model = [{
                            label: "Asynchronous children",
                            children: timer =>
                                 new Promise(resolve =>
                                    setTimeout(() =>
                                        resolve([{ label: "timer is provided by the async property" }]), timer))
                        }]

                        const async = _ => _(1000)

                        <TreeView /* ... */ async={ async } model={ model }></TreeView>` }
                </div>
        },
        dragndrop,
        {
            title: "noOpener",
            content:
                <div className="marged">
                    <p>Hides the opener.</p>
                    { jscode`
                        <TreeView /* ... */ noOpener={ true }></TreeView>` }
                </div>
        },
        {
            title: "labels",
            content:
                <div className="marged">
                    <p>Labels override.</p>
                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            labels: {
                                "search.placeholder": "Search ..."
                            } `}
                    </div>
                    { jscode`
                        const labels = {
                            "search.placeholder": "I am the text displayed in the search bar as a placeholder."
                        }

                        <TreeView /* ... */ labels={ labels }></TreeView>` }
                </div>
        },
        {
            title: "css",
            content:
                <div className="marged">
                    <p>Css classnames overrides.</p>
                    <div className="emphasis">
                        Defaults to :
                        { jscode`
                            css: {
                                TreeView:           "TreeView",
                                opener:             "opener",
                                depth:              "depth",
                                selected:           "selected",
                                category:           "category",
                                folded:             "folded",
                                disabled:           "disabled",
                                async:              "async",
                                loading:            "loading",
                                nodrop:             "nodrop",
                                dragover:           "dragover",
                                search:             "search",
                                item:               "item"
                            } `}
                    </div>
                    { jscode`
                        const css = { TreeView: "CustomTree", loading: "customLoading" }

                        <TreeView /* ... */ css={ css }></TreeView>
                    `}
                </div>
        },
        {
            title: "transition",
            content:
                <div className="marged">
                    <p>Creation / destruction transitions using <em><a href="https://github.com/reactjs/react-transition-group" target="_blank" rel="noopener noreferrer">react-transition-group</a></em>.</p>

                    { jscode`
                        transition: {
                            transitionName: "TransitionClassName",
                            transitionEnterTimeout: 300,
                            transitionLeaveTimeout: 300
                        }

                        <TreeView /* ... */ transition={ transition }></TreeView>` }
                </div>
        }
    ]
}
