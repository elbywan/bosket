<TreeViewSection>
    <div>
        <p>
            <span>Demonstrates a basic usage of the TreeView component </span>
            <span>and how to override and use most of its </span>
            <em><a href="#TreeView#Required properties">component props</a></em>, and&nbsp;
            <em><a href="#TreeView#Css">css styles</a></em>.
        </p>
        <span>Featuring :</span>
        <ul>
            <li>Drag and drop, with a custom drag image.</li>
            <li>Asynchronous children loading</li>
            <li>Multiselection using keyboard modifiers (shift / ctrl or cmd)</li>
            <li>Transitions on fold / unfold</li>
            <li>Alphabetical sort</li>
            <li>Search bar</li>
        </ul>
    </div>
    <ComponentDemo componentname="Nested items" files={ files }>
        <div class="TreeViewWindow">
            <div style="display: inline-block; text-align: left">
                <TreeViewDemo selection={ parent.selection } onselection={ parent.onselection }></TreeViewDemo>
            </div>

            <p>
                <span if={ parent.selection.length === 0 }>No elements are</span>
                <span if={ parent.selection.length === 1 }>One element is</span>
                <span if={ parent.selection.length > 1 }>{ parent.selection.length } elements are</span>
                selected.
            </p>

            <div class="select-blocks">
                <button each={ item in parent.selection } onclick={ parent.parent.deselect(item) }>
                    { item.label }
                </button>
            </div>
        </div>
    </ComponentDemo>

    <script>
        import "self/common/styles/TreeViewWindow.css"

        this.files = [
            "./components/Demos/TreeView/TreeViewDemo.tag",
            "./components/Demos/TreeView/TreeViewDemo.css",
            "../common/models/TreeViewModel.js"
        ]

        this.selection = []
        this.onselection = _ => this.update({ selection: _ })
        this.deselect = item => _ => this.selection = this.selection.filter(i => i !== item)
    </script>
</TreeViewSection>
