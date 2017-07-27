import { ChuckNorrisComponent, CategoryComponent, JokeComponent } from "./ChuckNorris"
import { HackerNewsComponent, FetchMoreComponent, CommentComponent, TopStoryComponent } from "./HackerNews"
import { PokeApiComponent, PokemonDisplayComponent, ItemDisplayComponent, SubcategoryDisplayComponent } from "./Pokeapi"
import { TreeViewDemo } from "./TreeView/TreeViewDemo.component"

export const demoEntryComponents = [
    CategoryComponent,
    JokeComponent,
    FetchMoreComponent,
    CommentComponent,
    TopStoryComponent,
    PokemonDisplayComponent,
    ItemDisplayComponent,
    SubcategoryDisplayComponent 
]

export const demoDeclarations = [
    ChuckNorrisComponent,
    HackerNewsComponent,
    PokeApiComponent,
    TreeViewDemo,
    ...demoEntryComponents
]