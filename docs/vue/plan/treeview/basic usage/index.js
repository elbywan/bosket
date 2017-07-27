import { jscode } from "self/vue/tools"

export default {
    title: "Basic Usage",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/treeview/basic%20usage/index.js",
    content: h =>
        <div>
            <p>
                To use the TreeView, you have to <em><a href="#Usage#Import">import</a></em> it in your code, then render it.<br/>
                <br/>
                Appearance can be tweaked with <em><a href="#TreeView#Css">css</a></em> styles.
            </p>
            { jscode`
                import { TreeView } from "bosket/vue"

                // Do not forget to [register it](#Usage#Import) if needed.

                <TreeView

                    // Required //

                    :model=         /* [the model array](#TreeView#Required props#model) */
                    :category=      /* [name of the property containing the children](#TreeView#Required props#category) */
                    :selection=     /* [the selection array, updated when the user (de)selects items](#TreeView#Required props#selection) */
                    :onSelect=      /* [selection callback](#TreeView#Required props#onSelect) */

                    // Optional //

                    :display=       /* [customize output for each element in the tree](#TreeView#Optional props#display) */
                    :strategies=    /* [behaviour on selection, click or fold](#TreeView#Optional props#strategies) */
                    :sort=          /* [sort items](#TreeView#Optional props#sort) */
                    :disabled=      /* [disable certain items](#TreeView#Optional props#disabled) */
                    :search=        /* [enables the search bar](#TreeView#Optional props#search) */
                    :async=         /* [how to perform asynchronous loading](#TreeView#Optional props#async) */
                    :dragndrop=     /* [drag'n'drop configuration](#TreeView#Optional props#dragndrop) */
                    :noOpener=      /* [hide opener 'arrow'](#TreeView#Optional props#noOpener) */
                    :labels=        /* [override default labels](#TreeView#Optional props#labels) */
                    :css=           /* [override default css classes](#TreeView#Optional props#css) */
                    :transition=    /* [transitions on create / destroy](#TreeView#Optional props#transition) */

                    ></TreeView>
            `(h) }
        </div>
}
