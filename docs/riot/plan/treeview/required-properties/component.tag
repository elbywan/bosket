<model-prop>
    <div class="marged">
        <pre class="itemType">Object[]</pre>
        <p>
            An array of objects which is used to populate the component.<br/>
            The format is detailed in the <em><a href="#Usage#Data model">data model</a></em> section.
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `
            <TreeView /* ... */ model={ model } />
            <script>
                this.model = [
                    { label: "One" },
                    { label: "Two" },
                    { label: "Three", list: [
                        { label: "Four" },
                        { label: "Five" }
                    ] }
                ]
            <\/script>` // eslint-disable-line no-useless-escape
    </script>
</model-prop>

<category-prop>
    <div class="marged">
        <pre class="itemType">string</pre>
        <p>
            The name of the property containing the children.<br/>
            In the example above, it would be "list".
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>

    <script>
        this.code = `<TreeView /* ... */ category="list" />`
    </script>
</category-prop>

<selection-prop>
    <div class="marged">
        <pre class="itemType">Object[]</pre>
        <p>
            An array which references the selected objects.
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>
    <script>
        this.code = `
            <TreeView /* ... */ selection={ selection } />
            <script>
                this.selection = []
            <\/script>`
    </script>
</selection-prop>

<onselection-prop>
    <div class="marged">
        <pre class="itemType">(newSelection: Object[], item: Object, ancestors: Object[], neighbours: Object[]) => void</pre>
        <p>
            A callback which is fired when the selection is updated (for instance when the user clicks on an item).<br/>
            This method should update the <em><a href="#TreeView#Required properties#selection">selection array</a></em>.
        </p>
        <syntax-highlight>{ parent.code }</syntax-highlight>
    </div>
    <script>
        this.code = `
            <TreeView /* ... */ selection={ selection } onselection={ onselection } />
            <script>
                this.selection = []
                this.onselection = _ => this.update({ selection : _ })
            <\/script>
        `
    </script>
</onselection-prop>
