import { enableProdMode }               from '@angular/core'
import { platformBrowser }              from '@angular/platform-browser'
import { BoscageDemoModuleFactory }     from "./aot/boscageDemo.module.ngfactory"

if (process.env.ENV === 'production') {
    enableProdMode()
}

const platform = platformBrowser()
if(!platform.destroyed) {
    platform.destroy()
}
if(document.getElementById("framework-root").childNodes.length > 0 && window["boscageDemoCleanup"]) {
    window["boscageDemoCleanup"]()
    delete window["boscageDemoCleanup"]
}
platform.bootstrapModuleFactory(BoscageDemoModuleFactory)