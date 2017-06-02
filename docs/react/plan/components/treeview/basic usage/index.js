import React from "react"

import { jscode } from "../../../../tools/tools"

export default {
    title: "Basic Usage",
    content:
        <div>
            <p>
                To use the TreeView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then render it.<br/>
                <br/>
                Appearance can be tweaked with <em><a href="#Components#TreeView#Css">css</a></em> styles.
            </p>
           { jscode`
                import { TreeView } from "bosket/react"

                const usage = _ =>
                    <TreeView

                        // Required //

                        model={         /* [the model array](#Components#TreeView#Required props#model) */ }
                        category={      /* [property containing children](#Components#TreeView#Required props#category) */ }
                        selection={     /* [the selection array, updated when the user (de)selects items](#Components#TreeView#Required props#selection) */ }
                        onSelect={      /* [selection callback](#Components#TreeView#Required props#onSelect) */ }

                        // Optional //

                        display={       /* [custom item display](#Components#TreeView#Optional props#display) */ }
                        key={           /* [unique identifier](#Components#TreeView#Optional props#key) */ }
                        strategies={    /* [behaviour on selection, click or fold](#Components#TreeView#Optional props#strategies) */ }
                        sort={          /* [sort items](#Components#TreeView#Optional props#sort) */ }
                        disabled={      /* [disable certain items](#Components#TreeView#Optional props#disabled) */ }
                        search={        /* [enables the search bar](#Components#TreeView#Optional props#search) */ }
                        async={         /* [how to treat asynchronous items](#Components#TreeView#Optional props#async) */ }
                        dragndrop={     /* [drag'n'drop configuration](#Components#TreeView#Optional props#dragndrop) */ }
                        noOpener={      /* [hide opener 'arrow'](#Components#TreeView#Optional props#noOpener) */ }
                        labels={        /* [override default labels](#Components#TreeView#Optional props#labels) */ }
                        css={           /* [override default css classes](#Components#TreeView#Optional props#css) */ }
                        transition={    /* [transitions on create / destroy](#Components#TreeView#Optional props#transition) */ }

                    ></TreeView>
            ` }
        </div>
}