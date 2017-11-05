import "./polyfills"

import "self/common/libs/prismjs/prism"

import { enableProdMode }           from "@angular/core"
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic"
import { DemoModule }               from "./demo.module"

const platform = platformBrowserDynamic()

if(process.env.NODE_ENV === "production") {
    enableProdMode()
}

window.onload = () => platform.bootstrapModule(DemoModule)
