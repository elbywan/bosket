// @flow

import React from "react"

class HideFrame extends React.PureComponent<*, *> {
    state = { hidden: true }

    render() {
        return this.state.hidden ?
            <div onClick={ _ => this.setState({ hidden: false }) } className="iframe-hide">
                <span>Click to load snippet</span>
            </div> :
            <div>{ this.props.children }</div>
    }
}

export default {
    title: "Online snippets",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/online-snippets/index.js",
    content:
        <HideFrame>
            <iframe width="100%" height="300" title="jsfiddle-react" src="//jsfiddle.net/elbywan/grL1prck/embedded/js,html,result/dark/" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
        </HideFrame>
}
