// @flow

import React from "react"

import { IntroductionDemos } from "./IntroductionDemos"

export default {
    title: "Introduction",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/introduction/index.js",
    content:
        <div>
            <p>
                This page covers the <em className="highlight"><a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">React</a></em> implementation of the <em><a href="../#Introduction">Bosket library</a></em>.<br/>
                Versatile and flexible, Bosket eases the creation and design of tree view components.<br/><br/>
                As a matter of fact <em><a href="https://github.com/elbywan/bosket/tree/master/docs/react/plan" target="_blank" rel="noopener noreferrer">this whole documentation</a></em> is built around Bosket using <em><a href="https://github.com/elbywan/bosket/blob/master/docs/react/components/Planner/Planner.js" target="_blank" rel="noopener noreferrer">a custom component</a></em> which automatically creates the table of contents and the anchors.<br/>
                <br/>
                Multiple use case examples (including the source code and the css stylesheet) are provided alongside the documentation.
            </p>
            <h4 className="center-text">API views implemented with Bosket</h4>
            <IntroductionDemos/>
        </div>
}
