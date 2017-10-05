<basic-usage>
    <div>
        <p>
            Just drop the TreeView tag in your templates after <em><a href="#Usage#Import">registering it</a></em>.<br/>
            <br/>
            Appearance can be tweaked using <em><a href="#TreeView#Css">css</a></em>.
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
        <TreeView

            // Required //

            model=         /* [the data model](#TreeView#Required properties#model) */
            category=      /* [name of the property containing the children](#TreeView#Required properties#category) */
            selection=     /* [the selection array, updated when the user (de)selects items](#TreeView#Required properties#selection) */
            onselection=   /* [selection callback](#TreeView#Required properties#onselection) */

            // Optional //

            display=       /* [customize output for each element in the tree](#TreeView#Optional properties#display) */
            displaytag=    /* [wrap output inside a tag of your choice](#TreeView#Optional properties#displaytag) */
            strategies=    /* [behaviour on selection, click or fold](#TreeView#Optional properties#strategies) */
            sort=          /* [sort items](#TreeView#Optional properties#sort) */
            disable=       /* [disable certain items](#TreeView#Optional properties#disabled) */
            search=        /* [enables the search bar](#TreeView#Optional properties#search) */
            async=         /* [how to perform asynchronous loading](#TreeView#Optional properties#async) */
            dragndrop=     /* [drag'n'drop configuration](#TreeView#Optional properties#dragndrop) */
            openeropts=    /* [opener 'arrow' options](#TreeView#Optional properties#openeropts) */
            labels=        /* [override default labels](#TreeView#Optional properties#labels) */
            css=           /* [override default css classes](#TreeView#Optional properties#css) */
            transition=    /* [transitions on mount / unmount](#TreeView#Optional properties#transition) */
        />
        `
    </script>
</basic-usage>
