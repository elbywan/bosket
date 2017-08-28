import { Component } from "@angular/core"

import "self/common/styles/IntroductionDemos.css"

@Component({
    selector: "IntroductionDemos",
    template: `
         <div class="IntroductionDemos">
            <div class="center-text">
                <span class="button-row">
                    <button *ngFor="let d of demos" (click)="demo = d" [ngClass]="{ selected: d === demo }">
                        {{ d }}
                    </button>
                </span>
            </div>
            <ComponentDemo [files]="getFiles(demo)" [ngSwitch]="demo">
                <ChuckNorrisComponent *ngSwitchCase="'ChuckNorris'"></ChuckNorrisComponent>
                <PokeApiComponent *ngSwitchCase="'Pokeapi'"></PokeApiComponent>
                <HackerNewsComponent *ngSwitchCase="'HackerNews'"></HackerNewsComponent>
            </ComponentDemo>
        </div>
    `
})
export class IntroductionDemosComponent {
    demos = [ "HackerNews", "Pokeapi", "ChuckNorris" ]
    demo = this.demos[0]
    getFiles(demo) {
        return [
            `./components/Demos/${demo}/${demo}.component.ts`,
            `../common/styles/${demo}.css`,
            `./components/Demos/${demo}/models.ts`
        ]
    }
}
