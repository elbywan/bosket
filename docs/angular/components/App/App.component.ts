import { Component } from "@angular/core"

@Component({
    selector: "div#framework-root",
    template: `
        <div class="App">
            <h4 class="inline-row">This page is rendered using Angular 4.2.5</h4>
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
