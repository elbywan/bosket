import { enableProdMode }               from '@angular/core'
import { platformBrowser }              from '@angular/platform-browser'
import { DemoModuleFactory }     from "./aot/demo.module.ngfactory"

if (process.env.ENV === 'production') {
    enableProdMode()
}

const platform = platformBrowser()
if(!platform.destroyed) {
    platform.destroy()
}
if(document.getElementById("framework-root").childNodes.length > 0 && window["demoCleanup"]) {
    window["demoCleanup"]()
    delete window["demoCleanup"]
}
platform.bootstrapModuleFactory(DemoModuleFactory)