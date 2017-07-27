import { Component } from "@angular/core"

@Component({
    template: `
        <p>
            This page covers the <em class="highlight"><a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular</a></em> implementation of the <em><a href="../#Introduction">Bosket library</a></em>.<br/>
            Versatile and flexible, Bosket eases the creation and design of tree view components.<br/><br/>
            As a matter of fact <em><a href="https://github.com/elbywan/bosket/tree/master/docs/angular/plan" target="_blank" rel="noopener noreferrer">this whole documentation</a></em> is built around Bosket using <em><a href="https://github.com/elbywan/bosket/blob/master/docs/angular/plan/Planner.component.ts" target="_blank" rel="noopener noreferrer">a custom component</a></em> which automatically creates the table of contents and the anchors.<br/>
            <br/>
            Multiple use case examples are provided alongside the documentation including the source code.
        </p>
        <h4 class="center-text">API views implemented with Bosket</h4>
        <IntroductionDemos></IntroductionDemos>
    `
})
export class Introduction {}
