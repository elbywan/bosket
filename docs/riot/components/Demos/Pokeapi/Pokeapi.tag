<PokeApiSubCategory>
    <span class="subcategory">{ opts.item.name }</span>
</PokeApiSubCategory>

<PokeApiItem>
    <div class={ subsection : opts.item.__subsection }>
        <img if={ opts.item.__image } src={ opts.item.__image } alt="sprite" />
        <div class="property-row" each={ prop in filterProps() }>
            <label>{ prop }</label><span>{ "" + parent.opts.item[prop] }</span>
        </div>
    </div>

    <script>
        this.filterProps = () => {
            const props = Object.getOwnPropertyNames(this.opts.item)
            return props.filter(prop => !prop.startsWith("__") && !(typeof this[prop] === "object") && !(typeof this[prop] === "function"))
        }
    </script>
</PokeApiItem>

<PokemonDisplay>
    <virtual>{ opts.item.name} </virtual>
</PokemonDisplay>

<PokeApi>
    <div style="position: relative;">
        <div style="text-align: center; margin: 10px;">
            <div>
                <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
                    <img src="https://avatars3.githubusercontent.com/u/19692032?v=4&s=200"
                        alt="Pokéapi logo" style="width: 50px; filter: drop-shadow(0 0 2px #444);" />
                </a>
            </div>
            <h5>Pokémon API crawler</h5>
            <div>
                <button onclick={ init } class="PokeapiButton">Reset</button>
            </div>
        </div>
        <TreeView
            model={ data }
            category="__children"
            selection={ selection }
            onselect={ onselect }
            displaytag={ display }
            strategies={ conf.strategies }
            css={ conf.css }
            disable={ conf.disable }
            search={ conf.search }
        />
        <div
            class={ PokeapiLoadMore: true, "center-text": true, loading: loading }
            style={ "display:" + loadUrl ? "block" : "none" }
            onclick={ loadMorePokemons }>
            <i class="fa fa-spinner fa-2x" if={ loading }></i>
            <span if={ !loading }>Show more pokémons</span>
        </div>
    </div>

    <script>
        import "self/common/styles/Pokeapi.css"
        import { Item, cachedFetch } from "./models"

        this.conf = {
            strategies: { fold: [ "opener-control", _ => !_.__subsection ], click: ["toggle-fold"]},
            css: { TreeView: "PokeapiDemo" },
            disable: _ => _.__children && _.__children instanceof Array && _.__children.length === 0,
            search: input => item => item.name && item.name.startsWith(input)
        }
        this.data = []
        this.selection = []
        this.onselect = _ => this.update({ selection: _ })
        this.loading = false
        this.loadUrl = "https://pokeapi.co/api/v2/pokemon"
        this.display = item => item.display()

        this.init = () => {
            this.loadUrl = "https://pokeapi.co/api/v2/pokemon"
            this.loadPokemons().then(_ => {
                this.update({ data: _ })
            })
        }
        this.one("mount", this.init)

        this.loadPokemons = () => {
            if(!this.loadUrl) return
            this.loading = true
            return cachedFetch(this.loadUrl)
                .then(json => {
                    this.loadUrl = json.next
                    this.loading = false
                    return json.results.map(i => ({
                        ...i,
                        display: () => "pokemondisplay",
                        __children: () => cachedFetch(i.url).then(json => [new Item(json)])
                    }))
                })
                .catch(err => this.loading = false)
        }
        this.loadMorePokemons = () => {
            if(this.loading) return
            this.loadPokemons().then(_ => {
                this.update({ data: [ ...this.data, ..._ ] })
            })
        }
    </script>
</PokeApi>
