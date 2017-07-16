import { Component, Input, ChangeDetectionStrategy, ComponentFactoryResolver,
    SimpleChanges, Type, ViewChild, ElementRef, ViewContainerRef, ChangeDetectorRef } from "@angular/core"

import { css } from "bosket/tools"
import { ItemComponent } from "bosket/angular"

import "./Planner.css"

type Plan = {
    title: string,
    content?: Type<any>,
    subs?: Plan[]
}

@Component({
    selector: "planner-content",
    template:`
        <div [class]="depth === 1 ? 'chapter' : 'planner-section'">
            <h1 *ngIf="depth === 1" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h1>
            <h2 *ngIf="depth === 2" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h2>
            <h3 *ngIf="depth === 3" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h3>
            <h4 *ngIf="depth === 4" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h4>
            <h5 *ngIf="depth === 5" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h5>
            <h6 *ngIf="depth === 6" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
            </h6>
            <p *ngIf="depth > 6" [id]="id()" class="Planner heading">
                <span>{{ plan.title }}</span>
                <a [href]="'#' + id() "><i className="fa fa-link"></i></a>
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
export class PlannerInjector implements ItemComponent<Plan> {
    @Input() item : Plan
    @Input() inputs: any

    href() {
        return `${this.inputs.ancestors.map(a => "#" + a.title).join("")}#${this.item.title}`
    }
}

// <aside #sidePanel [class]="'Planner side-panel ' + css.classes({ opened: this.state.opened })">
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
                    [strategies]="{ selection: ['ancestors'], fold: [ foldDepth(), 'not-selected', 'no-child-selection' ]}"
                    noOpener="true"
                    [itemComponent]="component">
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

    private onDocumentScroll(ev) {
        if(!this.ticking) {
            window.requestAnimationFrame(() => {
                const result = []
                const loop = (arr, acc = []) => {
                    for(let i = 0; i < arr.length; i++) {
                        const elt = arr[i]
                        const domElt = document.getElementById(acc.length > 0 ? acc.join("#") + "#" + elt.title : elt.title)
                        if(domElt && domElt.parentElement &&
                                domElt.parentElement.getBoundingClientRect().top <= 50 &&
                                domElt.parentElement.getBoundingClientRect().bottom > 10) {
                            result.push(elt)
                            if(elt.subs)
                                loop(elt.subs, [ ...acc, elt.title ])
                            break
                        }
                    }
                }
                loop(this.plan)
                this.selection = result
                const newHash = "#" + result.map(_ => _.title).join("#")
                if(newHash !== window.location.hash) {
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
                window.requestAnimationFrame(() => {
                    this.sidePanel.nativeElement.style.position = "absolute"
                    this.sidePanel.nativeElement.style.top = ""
                    this.sticking = false
                    this.stickTick = false
                })
            } else {
                window.requestAnimationFrame(() => {
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
