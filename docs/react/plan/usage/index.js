// @flow

import React from "react"

import _import from "./import"
import dataModel from "./data model"
import style from "./style"

import { bashcode } from "self/react/tools/tools"

export default {
    title: "Usage",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/index.js",
    content:
        <div>
            <p>It is assumed that you followed the installation <em><a href="../#Setup" >guidelines</a></em>.</p>
            <p>Bosket/react relies on css-transition-group version 1 to animate transitions.</p>
            { bashcode`
                 npm i react-transition-group@^1` }
        </div>,
    subs: [
        _import,
        dataModel,
        style
    ]
}
