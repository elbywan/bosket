import "./polyfills"

import { enableProdMode }           from '@angular/core'
import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic'
import { DemoModule }               from "./demo.module"

const platform = platformBrowserDynamic()

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platform.bootstrapModule(DemoModule)


