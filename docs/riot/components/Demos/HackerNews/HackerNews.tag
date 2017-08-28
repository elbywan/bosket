<HackerNewsFetchMore>
    <div class="fetchMore" onclick={ more }>
        <a>Load more comments</a>
    </div>

    <script>
        this.more = e => {
            this.opts.item.fetchKids().then(this.parent.parent.update)
        }
    </script>
</HackerNewsFetchMore>

<HackerNewsTopStories>
    <span class="story">
        <span class="commentCount"><span if={ item.descendants}>({ item.descendants }) </span>({ item.score } points) - by <a href={ "https://news.ycombinator.com/user?id=" + item.by } target="_blank" rel="noopener noreferrer">{ item.by }</a></span>
        <a href={ item.url } target="_blank" rel="noopener noreferrer">
            { item.title }
        </a>
    </span>

    <script>
        this.item = this.opts.item
    </script>
</HackerNewsTopStories>

<HackerNewsComment>
    <div class="comment">
        <div class="infobar">
            <span class="commentCount" if={ item.kids && item.kids.length > 0 }>({ item.kids.length })</span>
            <a href={ "https://news.ycombinator.com/user?id=" + item.by } target="_blank" rel="noopener noreferrer">{ item.by }</a> { item.date }
        </div>
        <div class="text" if={ item.deleted }><em>Deleted.</em></div>
        <div class="text" if={ !item.deleted } ref="content"></div>
    </div>

    <script>
        this.item = this.opts.item
        const refreshContent = () => this.refs.content.innerHTML = this.item.text
        this.on("update", refreshContent)
        this.one("mount",  refreshContent)
    </script>
</HackerNewsComment>

<HackerNews>
    <div>
        <div style="text-align: center; margin: 10px;">
            <div>
                <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer">
                    <img src="http://www.ycombinator.com/images/ycombinator-logo-fb889e2e.png"
                        alt="HackerNews logo" style="width: 50px; filter: drop-shadow(0 0 2px #444);" />
                </a>
            </div>
            <h5>The top 10 stories from HackerNews.</h5>
            <div>
                <button onclick={ init } class="HackerNewsButton">Reset</button>
            </div>
            <i if={ stories.length === 0 } class="HackerNewsSpinner fa fa-spinner fa-3x"></i>
        </div>
        <TreeView if={ stories.length > 0 }
            model={ stories }
            category="children"
            selection={ selection }
            onselect={ onselect }
            displaytag={ display }
            strategies={ conf.strategies }
            css={ conf.css }></TreeView>
    </div>
    <script>
        import "self/common/styles/HackerNews.css"
        import { fetchLast, TopStory } from "./models"

        this.stories = []
        this.selection = []
        this.onselect = _ => this.update({ selection: _ })
        this.conf = {
            strategies: { fold: ["opener-control"]},
            css: { TreeView: "HackerNewsDemo" }
        }
        this.display = item => item.display()

        this.init = () => {
            fetch("https://hacker-news.firebaseio.com/v0/beststories.json")
                .then(response => response.json())
                .then(topStories => fetchLast(topStories, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`))
                .then(topStories => {
                    this.stories = topStories.map(story => new TopStory(story))
                    this.update()
                })
        }
        this.one("mount", this.init)
    </script>
</HackerNews>
