export class Category {
    constructor(category) {
        this.value = category
        this.children = this.loadJoke
    }

    loadJoke = () =>
        fetch(`https://api.chucknorris.io/jokes/random?category=${ this.value }`)
            .then(response => response.json())
            .then(joke => [new Joke(joke)])

    // Riotjs tags are lowercased by the compiler
    display = () => "chucknorriscategory"
}

export class Joke {
    constructor(joke) { Object.assign(this, joke) }
    // Riotjs tags are lowercased by the compiler
    display = () => "chucknorrisjoke"
}
