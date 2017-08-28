<IntroductionDemos>
    <div class="IntroductionDemos">
       <div class="center-text">
           <span class="button-row">
               <button each={ d in demos} onclick={ setDemo(d) } class={ selected: d === demo }>
                   { d }
               </button>
           </span>
       </div>
       <ComponentDemo files={ getFiles(demo) }>
            <virtual data-is={ parent.demo.toLowerCase() }/>
       </ComponentDemo>
   </div>
    <script>
        import "self/common/styles/IntroductionDemos.css"

        this.demos = [ "HackerNews", "Pokeapi", "ChuckNorris" ]
        this.demo = this.demos[0]
        this.setDemo = d => _ => this.demo = d
        this.getFiles = demo =>
            [
                `./components/Demos/${demo}/${demo}.tag`,
                `../common/styles/${demo}.css`,
                `./components/Demos/${demo}/models.js`
            ]
    </script>
</IntroductionDemos>
