// @flow

import React from "react"

import { jscode } from "self/react/tools/tools"

export default {
    title: "Import",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/react/plan/usage/import/index.js",
    content:
        <span>
            <p>Preferred way of loading Bosket is to use ES2015 modules.</p>

            { jscode`
                // As a namespace
                import * as Bosket from "bosket/react"

                // Or only the component(s) you need
                import { /* Component(s) */ } from "bosket/react"` }

        </span>
}
