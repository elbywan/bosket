import { Component, Input, ChangeDetectionStrategy, ComponentFactoryResolver, NgZone,
    SimpleChanges, Type, ViewChild, ElementRef, ViewContainerRef, ChangeDetectorRef } from "@angular/core"

import { css } from "@bosket/tools"
import { DisplayComponent } from "@bosket/angular"

import "self/common/styles/Planner.css"

type Plan = {
    title: string,
    content?: Type<any>,
    subs?: Plan[],
    editLink?: string
}

@Component({
    selector: "planner-content",
    template:`
        <div [class]="depth === 1 ? 'chapter' : 'planner-section'">
            <h1 *ngIf="depth === 1" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h1>
            <h2 *ngIf="depth === 2" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h2>
            <h3 *ngIf="depth === 3" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h3>
            <h4 *ngIf="depth === 4" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h4>
            <h5 *ngIf="depth === 5" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h5>
            <h6 *ngIf="depth === 6" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </h6>
            <p *ngIf="depth > 6" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <span class="icons">
                    <a [href]="'#' + id() "><i class="fa fa-link"></i></a>
                    <a *ngIf="plan.editLink" [href]="plan.editLink" target="_blank" rel=" noopener noreferrer">
                        <i class="fa fa-pencil"></i>
                    </a>
                </span>
            </p>
            <div #content></div>
            <div *ngIf="plan.subs">
                <div *ngFor="let s of plan.subs">
                    <planner-content [plan]="s" [prefix]="prefix ? prefix+'#'+plan.title : plan.title" [depth]="depth + 1"></planner-content>
                </div>
            </div>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerContent {
    @Input() plan: Plan
    @Input() prefix: string = ""
    @Input() depth: number = 1
    @ViewChild("content", { read: ViewContainerRef } ) content : ViewContainerRef

    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _cdRef: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges) {
        this.refresh()
    }
    ngAfterViewInit() {
        this.refresh()
    }

    refresh() {
        if(!this.plan || !this.content || !this.plan.content) return

        this.content.clear()
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.plan.content)
        let componentRef = this.content.createComponent(componentFactory)

        setTimeout(() => this._cdRef.markForCheck(), 0)
    }

    id() {
        return this.prefix ? `${this.prefix}#${this.plan.title}` : this.plan.title
    }
}

@Component({
    template: `<a [href]="href()">{{ item.title }}</a>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerInjector implements DisplayComponent<Plan> {
    @Input() item : Plan
    @Input() inputs: any

    href() {
        return `${this.inputs.ancestors.map(a => "#" + a.title).join("")}#${this.item.title}`
    }
}

@Component({
    selector: "planner",
    template: `
        <div class="Planner">
            <div class="Planner opener" #opener>
                <i class="fa" [ngClass]="{
                    'fa-bars': !opened,
                    'fa-times': opened
                }"></i>
            </div>
            <aside #sidePanel class="Planner side-panel" [ngClass]="{ opened: opened }">
                <div><h1>Table of contents</h1></div>
                <TreeView
                    [model]="plan"
                    [css]="{ TreeView: 'PlannerTree' }"
                    category="subs"
                    [(selection)]="selection"
                    [strategies]="{ selection: ['ancestors'], click: ['select'], fold: [ foldDepth(), 'not-selected', 'no-child-selection' ]}"
                    [openerOpts]="{ position: 'none' }"
                    [displayComponent]="component">
                </TreeView>
            </aside>
            <div #content class="Planner content">
                <div *ngFor="let p of plan">
                    <planner-content [plan]="p"></planner-content>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:scroll)': 'onDocumentScroll($event)',
        '(document:click)': 'onDocumentClick($event)'
    }
})
export class Planner {
    @Input() plan : Object
    @Input() maxDepth : number = 0
    @Input() sticky : boolean = false
    @ViewChild("sidePanel") sidePanel : ElementRef
    @ViewChild("content") content : ElementRef
    @ViewChild("opener") opener: ElementRef

    public selection = []
    public foldDepth = () => {
        const max = this.maxDepth
        return function() {
            return this.inputs.get().depth >= max
        }
    }
    public css = css
    public component = PlannerInjector
    public opened = false
    private ticking = false
    private stickTick = false
    private sticking = false

    constructor(private _ngZone: NgZone){}
    ngAfterViewInit() { this.selection = this.findPosition() }

    private nextFrame(_) {
        return this._ngZone.runOutsideAngular(() => {
            window.requestAnimationFrame(_)
        })
    }

    private findPosition() {
        const position = []
        const loop = (arr, acc = []) => {
            for(let i = 0; i < arr.length; i++) {
                const elt = arr[i]
                const domElt = document.getElementById(acc.length > 0 ? acc.join("#") + "#" + elt.title : elt.title)
                if(domElt && domElt.parentElement &&
                        domElt.parentElement.getBoundingClientRect().top <= 50 &&
                        domElt.parentElement.getBoundingClientRect().bottom > 10) {
                    position.push(elt)
                    if(elt.subs)
                        loop(elt.subs, [ ...acc, elt.title ])
                    break
                }
            }
        }
        loop(this.plan)
        return position
    }

    private onDocumentScroll(ev) {
        if(!this.ticking) {
            this.nextFrame(() => {
                const result = this.findPosition()
                const newHash = "#" + result.map(_ => _.title).join("#")
                if(newHash !== (window.location.hash || "#")) {
                    this.selection = result
                    window.history && window.history.replaceState(
                        {},
                        document.title,
                        "#" + result.map(_ => _.title).join("#"))
                }
                // Prevents safari security exception (SecurityError (DOM Exception 18): Attempt to use history.replaceState() more than 100 times per 30.000000 seconds)
                setTimeout(() => this.ticking = false, 100)
            })
            this.ticking = true
        }
        if(this.sticky && !this.stickTick) {
            if(this.content.nativeElement.getBoundingClientRect().top > 0) {
                this.nextFrame(() => {
                    this.sidePanel.nativeElement.style.position = "absolute"
                    this.sidePanel.nativeElement.style.top = ""
                    this.sticking = false
                    this.stickTick = false
                })
            } else {
                this.nextFrame(() => {
                    this.sidePanel.nativeElement.style.position = "fixed"
                    this.sidePanel.nativeElement.style.top = "0px"
                    this.sticking = true
                    this.stickTick = false
                })
            }
            this.stickTick = true
        }
    }
    private onDocumentClick(ev) {
         if(!(ev.target instanceof HTMLElement)) return
            if(this.opener && this.opener.nativeElement.contains(ev.target)) {
                this.opened = !this.opened
            } else if(this.opened && this.sidePanel && !this.sidePanel.nativeElement.contains(ev.target))
                this.opened = false
    }
}
