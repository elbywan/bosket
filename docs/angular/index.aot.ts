import "./polyfills"

import "self/common/libs/prismjs/prism"

import { enableProdMode }       from "@angular/core"
import { platformBrowser }      from "@angular/platform-browser"
import { DemoModuleNgFactory }  from "./demo.module.ngfactory"

const platform = platformBrowser()

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

window.onload = () => platform.bootstrapModuleFactory(DemoModuleNgFactory)
