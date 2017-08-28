<ComponentDemo>
    <div class="ComponentDemo section">
        <h3 if={ componentname }>{ componentname }</h3>
        <p if={ description }>{ description }</p>
        <div class={ ComponentDemo: true, "flex-container": true, expanded: expand }>
            <div class={ ComponentDemo: true, "demo-area": true, expand: expand === "demo" }>
                <!-- Expand button -->
                <div class="ComponentDemo expander" onclick={ doExpand("demo") }>
                    <i class={
                        fa: true,
                        "fa-compress":  expand === "demo",
                        "fa-expand":    expand !== "demo"
                    }></i>
                </div>
                <!-- Demo content -->
                <div class="ComponentDemo padded">
                    <yield/>
                </div>
            </div>
            <div class={ ComponentDemo: true, code: true, expand: expand === "code" }>
                <!-- Expand button -->
                <div class="ComponentDemo expander" onclick={ doExpand("code") }>
                    <i class={
                        fa: true,
                        "fa-compress":  expand === "code",
                        "fa-expand":    expand !== "code"
                    }></i>
                </div>
                <!-- Code files tabs -->
                <div class="tabs">
                    <div each={ file in files } onclick={ setTab(file) } class={ selected: parent.tab === file }>
                        { getFileName(file) }
                    </div>
                </div>
                <!-- Code files content -->
                <pre class={ "language-" + getPrismExtension(tab) }><code class={ "language-" + getPrismExtension(tab) } ref="tabContents"></code></pre>
            </div>
        </div>
    </div>

    <script>
        import "self/common/styles/ComponentDemo.css"

        import { loadFile } from "self/common/tools"

        Object.assign(this, this.opts)
        if(!this.files) this.files = []

        this.expand = "demo"
        this.doExpand = target => _ => this.expand = this.expand === target ? "" : target

        this._tab = null
        this.setTab = file => e => this.tab = file
        Object.defineProperty(this, "tab", {
            configurable: true,
            get: () => this._tab || (this.files.length > 0 ? this.files[0] : null),
            set: file => {
                this._tab = file
                loadFile(file, code => {
                    this.refs.tabContents.innerHTML =
                        window["Prism"].highlight(code, window["Prism"].languages[this.getPrismExtension(file)])
                })
            }
        })
        this.tab = this.files.length > 0 ? this.files[0] : null

        this.getFileName = file => file.split("/").splice(-1)
        this.getPrismExtension = file => {
            const split = file.split(".")
            let extension = "javascript"
            if(split[split.length - 1] === "css")
                extension = "css"
            else if(split[split.length - 1] === "ts")
                extension = "typescript"
            return extension
        }

    </script>
</ComponentDemo>
