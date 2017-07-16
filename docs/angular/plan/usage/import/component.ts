import { Component } from "@angular/core"

@Component({
    template: `
        <p>To use the components, you must first import the Bosket module.</p>
        <syntax-highlight language="typescript">
            import {{ '{' }} BosketModule } from "bosket/angular"

            // [Use the angular imports](https://angular.io/guide/ngmodule#import-supporting-modules) //

            @NgModule({{ '{' }}
                // ... //
                imports: [ /* ... */, BosketModule, /* ... */ ],
                // ... //
            })
        </syntax-highlight>
    `
})
export class Import {}