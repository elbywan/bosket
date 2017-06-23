import { Component } from "@angular/core"

@Component({
    selector: "div#framework-root",
    template: `
        <div class="App">
            <p>This page is rendered using angular 4.2.4</p>
            <div class="components-container">
                <treeview-section></treeview-section>
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
