import sanitize from "sanitize-html"

export const fetchLast = (arr, getUrl, limit = 10, offset = 0) =>
    Promise.all(arr.slice(offset, offset + limit).map(_ => fetch(getUrl(_)).then(response => response.json())))

class Item {

    constructor(data) {
        Object.assign(this, data)
        if(this.kids) {
            this.children = () => this.fetchKids()
        }
    }

    offset = 0
    fetchLimit = 5

    fetchKids() {
        if(this.children instanceof Array && this.children[this.children.length - 1].id === -1)
            this.children = this.children.slice(0, this.children.length - 1)
        return fetchLast(this.kids, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`, this.fetchLimit, this.offset)
            .then(kids => {
                const result = kids.map(k => new Comment(k))
                this.offset += this.fetchLimit
                if(this.offset < this.kids.length) {
                    result.push({
                        id: -1,
                        fetchKids: () => this.fetchKids().then(_ => {
                            if(this.children instanceof Array)
                                this.children = [ ...this.children, ..._ ]
                        }),
                        // Riotjs tags are lowercased by the compiler
                        display: () => "hackernewsfetchmore"
                    })
                }
                return result
            })
    }
}

export class TopStory extends Item {
    // Riotjs tags are lowercased by the compiler
    display = () => "hackernewstopstories"

}

export class Comment extends Item {

    constructor(data) {
        super(data)
        this.text = sanitize(this.text)
        this.date = new Date(this.time * 1000).toLocaleDateString()
    }

    // Riotjs tags are lowercased by the compiler
    display = () => "hackernewscomment"

}
