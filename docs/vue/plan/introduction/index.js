import IntroductionDemos from "./IntroductionDemos"

export default {
    title: "Introduction",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/introduction/index.js",
    content: h =>
        <div>
            <p>
                This page covers the <em class="highlight"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</a></em> implementation of the <em><a href="../#Introduction">Bosket library</a></em>.<br/>
                Versatile and flexible, Bosket eases the creation and design of tree view components.<br/><br/>
                As a matter of fact <em><a href="https://github.com/elbywan/bosket/tree/master/docs/vue/plan" target="_blank" rel="noopener noreferrer">this whole documentation</a></em> is built around Bosket using <em><a href="https://github.com/elbywan/bosket/blob/master/docs/vue/components/Planner.js" target="_blank" rel="noopener noreferrer">a custom component</a></em> which automatically creates the table of contents and the anchors.<br/>
            </p>
            <h4 className="center-text">API views implemented with Bosket</h4>
            <IntroductionDemos />
        </div>
}
