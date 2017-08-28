import { Component, Input, ViewChild, ChangeDetectionStrategy, ElementRef } from "@angular/core"

import "self/common/styles/ComponentDemo.css"

import { loadFile } from "self/common/tools"

@Component({
    selector: "ComponentDemo",
    template: `
        <div class="ComponentDemo section">
            <h3 *ngIf="componentName">{{ componentName }}</h3>
            <p *ngIf="description">{{ description }}</p>
            <div class="ComponentDemo flex-container expanded" [ngClass]="{ expanded: expand }">
                <div class="ComponentDemo demo-area expand" [ngClass]="{ expand: expand === 'demo' }">
                    <!-- Expand button -->
                    <div class="ComponentDemo expander" (click)="expand = expand === 'demo' ? '' : 'demo'">
                        <i class="fa" [ngClass]="{
                            'fa-compress':  expand === 'demo',
                            'fa-expand':    expand !== 'demo'
                        }"></i>
                    </div>
                    <!-- Demo content -->
                    <div class="ComponentDemo padded">
                        <ng-content></ng-content>
                    </div>
                </div>
                <div class="ComponentDemo code" [ngClass]="{ expand: expand === 'code' }">
                    <!-- Expand button -->
                    <div class="ComponentDemo expander" (click)="expand = expand === 'code' ? '' : 'code'">
                        <i class="fa" [ngClass]="{
                            'fa-compress':  expand === 'code',
                            'fa-expand':    expand !== 'code'
                        }"></i>
                    </div>
                    <!-- Code files tabs -->
                    <div class="tabs">
                        <div *ngFor="let f of files" (click)="tab = f" [ngClass]="{ selected: tab === f }">
                            {{ getFileName(f) }}
                        </div>
                    </div>
                    <!-- Code files content -->
                    <pre [class]="'language-' + getPrismExtension(tab)"><code [class]="'language-' + getPrismExtension(tab)" #tabContents></code></pre>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentDemo {

    @ViewChild("tabContents") tabContents : ElementRef
    @Input() componentName : string
    @Input() description: string
    @Input("files") _files: string[]
    get files() { return this._files || [] }
    private _tab : string
    get tab() : string | null { return this._tab || (this.files.length > 0 ? this.files[0] : null) }
    set tab(file) {
        this._tab = file
        loadFile(file, code => {
            this.tabContents.nativeElement.innerHTML = window["Prism"].highlight(code, window["Prism"].languages[this.getPrismExtension(file)])
        })
    }
    expand = "demo"

    ngAfterViewInit() {
        this.tab = this.files.length > 0 ? this.files[0] : null
    }

    getFileName(file) { return file.split("/").splice(-1) }
    getPrismExtension(file) {
        const split = file.split(".")
        let extension = "javascript"
        if(split[split.length - 1] === "css")
            extension = "css"
        else if(split[split.length - 1] === "ts")
            extension = "typescript"
        return extension
    }
}
