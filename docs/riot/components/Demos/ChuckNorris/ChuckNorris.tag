<ChuckNorrisCategory>
    <span class="value">{ item.value }
        <i class={ "fa fa-refresh" + (item.children.length === 0 ? " loading" : "") }
            onclick={ onClick }>
        </i>
    </span>

    <script>
        this.item = this.opts.item
        this.onClick = e => {
            this.item.children = []
            this.item.loadJoke().then(joke => {
                this.item.children = joke
                this.parent.update()
            })
        }
    </script>
</ChuckNorrisCategory>

<ChuckNorrisJoke>
    <div class="value">
        <a href={ item.url } target="_blank" rel="noopener noreferrer">{ item.value }</a>
    </div>

    <script>
        this.item = this.opts.item
    </script>
</ChuckNorrisJoke>

<ChuckNorris>
    <div>
       <div style="text-align: center; margin: 10px;">
           <div>
               <a href="https://api.chucknorris.io/" target="_blank" rel="noopener noreferrer">
                   <img src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small.png"
                       alt="Chuck Norris api logo" style="width: 100px; filter: drop-shadow(0 0 2px #444);" />
               </a>
           </div>
           <h5>A curated list of Chuck Norris jokes.</h5>
           <div>
               <button onclick={ init } class="ChuckNorrisButton">Reset</button>
           </div>
            <i if={ categories.length === 0 } class="ChuckNorrisSpinner fa fa-spinner fa-3x"></i>
       </div>
       <TreeView if={ categories.length > 0 }
            model={ categories }
            category="children"
            selection={ selection }
            onselection={ onselection }
            displaytag={ display }
            strategies={ conf.strategies }
            css={ conf.css }/>
    </div>

    <script>
        import "self/common/styles/ChuckNorris.css"
        import { Category } from "./models"

        this.categories = []
        this.selection = []
        this.onselection = _ => this.update({ selection: _ })
        this.conf = {
            strategies: { fold: ["opener-control"], click: ["unfold-on-selection"]},
            css: { TreeView: "ChuckNorrisDemo" }
        }
        this.init = () => {
            fetch("https://api.chucknorris.io/jokes/categories")
                    .then(response => response.json())
                    .then(categories => {
                        this.categories = categories.map(cat => new Category(cat))
                        this.update()
                    })
        }
        this.one("mount", this.init)
        this.display = item => item.display()
    </script>
</ChuckNorris>
