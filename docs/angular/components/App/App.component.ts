import { Component } from "@angular/core"

@Component({
    selector: "div#framework-root",
    template: `
        <div class="App">
            <p>This page is rendered using angular 4.1.2</p>
            <div class="components-container">
                <itemtree-section></itemtree-section>
            </div>
        </div>
    `,
    styles: [`
        .App {
            /* text-align: center; */
        }

        .App-intro {
            font-size: large;
        }
    `]
})
export class AppComponent {}