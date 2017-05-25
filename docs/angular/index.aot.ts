import { enableProdMode }       from '@angular/core'
import { platformBrowser }      from '@angular/platform-browser'
import { DemoModuleNgFactory }    from "./aot/demo.module.ngfactory"

const platform = platformBrowser()

if(document.getElementById("framework-root").childNodes.length > 0 && window["demoCleanup"]) {
    window["demoCleanup"]()
    delete window["demoCleanup"]
}

window["demoCleanup"] = function() {
    if(!platform.destroyed) {
        platform.destroy()
        if(document.getElementById("framework-root"))
            document.getElementById("framework-root").remove()
        var root = document.createElement("div")
        root.setAttribute("id", "framework-root")
        document.getElementById("content").appendChild(root)
    }
}

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platform.bootstrapModuleFactory(DemoModuleNgFactory)