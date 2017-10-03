const HideFrame = {
    data() {
        return { hidden: true }
    },
    render(h) {
        return this.hidden ?
            <div onClick={ _ => this.hidden = false } class="iframe-hide">
                <span>Click to load snippet</span>
            </div> :
            <div>{ this.$slots.default }</div>
    }
}

export default {
    title: "Online snippets",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/online-snippets/index.js",
    content: h =>
        <HideFrame>
            <iframe width="100%" height="300" title="jsfiddle-react" src="//jsfiddle.net/elbywan/dbsb7yhc/embedded/js,html,result/dark/" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
        </HideFrame>
}
