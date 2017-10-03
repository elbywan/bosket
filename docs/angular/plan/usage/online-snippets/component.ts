import { Component } from "@angular/core"

@Component({
    template: `
        <iframe *ngIf="!hidden" width="100%" height="350" title="jsfiddle-react" src="https://stackblitz.com/edit/bosket-angular?embed=1&file=main.ts&hideNavigation=1" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
        <div *ngIf="hidden" class="iframe-hide" (click)="unHide()"><span>Click to load snippet</span></div>
    `
})
export class OnlineSnippets {
    hidden = true
    unHide() { this.hidden = false }
}
