// @flow

import React from "react"

import { jscode } from "self/react/tools"

export default {
    title: "Basic Usage",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/treeview/basic%20usage/index.js",
    content:
        <div>
            <p>
                To use the TreeView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then <a href="https://facebook.github.io/react/docs/rendering-elements.html" target="_blank" rel="noopener noreferrer">render</a> it.<br/>
                <br/>
                Appearance can be tweaked using <em><a href="#TreeView#Css">css</a></em>.
            </p>
            { jscode`
                import { TreeView } from "@bosket/react"

                const usage = _ =>
                    <TreeView

                        // Required //

                        model={         /* [the data model](#TreeView#Required properties#model) */ }
                        category={      /* [name of the property containing the children](#TreeView#Required properties#category) */ }
                        selection={     /* [the selection array, updated when the user (de)selects items](#TreeView#Required properties#selection) */ }
                        onSelect={      /* [selection callback](#TreeView#Required properties#onSelect) */ }

                        // Optional //

                        display={       /* [customize output for each element in the tree](#TreeView#Optional properties#display) */ }
                        unique={        /* [unique identifier](#TreeView#Optional properties#unique) */ }
                        strategies={    /* [behaviour on selection, click or fold](#TreeView#Optional properties#strategies) */ }
                        sort={          /* [sort items](#TreeView#Optional properties#sort) */ }
                        disabled={      /* [disable certain items](#TreeView#Optional properties#disabled) */ }
                        search={        /* [enables the search bar](#TreeView#Optional properties#search) */ }
                        async={         /* [how to perform asynchronous loading](#TreeView#Optional properties#async) */ }
                        dragndrop={     /* [drag'n'drop configuration](#TreeView#Optional properties#dragndrop) */ }
                        noOpener={      /* [hide opener 'arrow'](#TreeView#Optional properties#noOpener) */ }
                        labels={        /* [override default labels](#TreeView#Optional properties#labels) */ }
                        css={           /* [override default css classes](#TreeView#Optional properties#css) */ }
                        transition={    /* [transitions on create / destroy](#TreeView#Optional properties#transition) */ }

                    ></TreeView>
            ` }
        </div>
}
