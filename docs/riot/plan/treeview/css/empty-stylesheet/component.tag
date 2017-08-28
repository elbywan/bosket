<treeview-empty-stylesheet>
    <div>
        <h4>
            <a  ref="anchor"
                download="bosket_empty_stylesheet.css"
                class="anchor-button basic-button">
                <i class="fa fa-download"></i>
                Download stylesheet
            </a>
        </h4>

        <syntax-highlight language="css">{ parent.emptyStylesheet }</syntax-highlight>
    </div>

    <script>
        import emptyStylesheet from "./empty_stylesheet"

        this.emptyStylesheet = emptyStylesheet
        this.one("mount", () => {
            this.refs.anchor.href = window.URL.createObjectURL(new Blob([emptyStylesheet], { type: "text/css" }))
        })
    </script>
</treeview-empty-stylesheet>
