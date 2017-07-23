import React from "react"

export class Category {
    constructor(category) {
        this.value = category
        this.children = this.loadJoke
    }

    loadJoke = () =>
        fetch(`https://api.chucknorris.io/jokes/random?category=${ this.value }`)
            .then(response => response.json())
            .then(joke => [new Joke(joke)])

    display(update) {
        return <span className="value">{ this.value }
            <i className={ "fa fa-refresh" + (this.children.length === 0 ? " loading" : "") }
                onClick={ _ => {
                    this.children = []
                    this.loadJoke().then(joke => {
                        this.children = joke; update()
                    })
                }}>
            </i>
        </span>
    }
}

export class Joke {
    constructor(joke) { Object.assign(this, joke) }
    display() {
        return (
            <div className="value">
                <a href={ this.url } target="_blank" rel="noopener noreferrer">{ this.value }</a>
            </div>
        )
    }
}
