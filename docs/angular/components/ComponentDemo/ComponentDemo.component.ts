import { Component, Input, ViewChild, ChangeDetectionStrategy, ElementRef } from "@angular/core"

import "self/common/styles/ComponentDemo.css"

import { loadFile } from "self/common/tools"

const Prism = require("self/common/libs/prismjs/prism")

@Component({
    selector: "component-demo",
    template: `
        <div class="ComponentDemo section">
            <h3>{{ componentName }}</h3>
            <p> {{ description }}</p>
            <div class="ComponentDemo flex-container" [ngClass]="{ expanded: this.expand }">
                <div class="ComponentDemo demo-area" [ngClass]="{ expand: this.expand === 'demo' }">
                    <!-- Expand button -->
                    <div class="ComponentDemo expander" (click)="this.expand = this.expand === 'demo' ? '' : 'demo'">
                        <i class="fa" [ngClass]="{
                            'fa-compress':  this.expand === 'demo',
                            'fa-expand':    this.expand !== 'demo'
                        }"></i>
                    </div>
                    <!-- Demo content -->
                    <div className="ComponentDemo padded">
                        <ng-content></ng-content>
                    </div>
                </div>
                <div class="ComponentDemo code" [ngClass]="{ expand: this.expand === 'code' }">
                    <!-- Expand button -->
                    <div class="ComponentDemo expander" (click)="this.expand = this.expand === 'code' ? '' : 'code'">
                        <i class="fa" [ngClass]="{
                            'fa-compress':  this.expand === 'code',
                            'fa-expand':    this.expand !== 'code'
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
            this.tabContents.nativeElement.innerHTML = Prism.highlight(code, Prism.languages[this.getPrismExtension(file)])
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
