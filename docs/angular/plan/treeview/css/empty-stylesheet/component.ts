import { Component, ViewChild, ElementRef } from "@angular/core"
import emptyStylesheet from "./empty_stylesheet"

@Component({
    template: `
        <div>
            <h4>
                <a  #anchor
                    download="bosket_empty_stylesheet.css"
                    class="anchor-button basic-button">
                    <i class="fa fa-download"></i>
                    Download stylesheet
                </a>
            </h4>

            <syntax-highlight language="css">{{ emptyStylesheet }}</syntax-highlight>
        </div>
    `
})
export class TreeViewEmptyStylesheet {
    @ViewChild("anchor") anchor : ElementRef
    emptyStylesheet = emptyStylesheet

    ngAfterViewInit() {
        this.anchor.nativeElement.href = window.URL.createObjectURL(new Blob([emptyStylesheet], { type: "text/css" }))
    }
}
