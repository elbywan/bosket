<online-snippets>
    <iframe if={ !hidden } width="100%" height="300" title="jsfiddle-react" src="//jsfiddle.net/elbywan/w17o67vw/embedded/js,html,result/dark/" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
    <div if={ hidden } class="iframe-hide" onclick={ unHide }><span>Click to load snippet</span></div>

    <script>
        this.hidden = true
        this.unHide = () => { this.hidden = false }
    </script>
</online-snippets>
