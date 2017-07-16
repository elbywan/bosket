import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core"
import { indent } from "self/common/tools"

const Prism = require("self/common/libs/prismjs/prism")

@Component({
    selector: "syntax-highlight",
    template: `
        <pre class="language-{{ language }}"><code class="language-{{ language }}" #ref><ng-content></ng-content></code></pre>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyntaxHighlight {
    @Input() language : string
    @ViewChild("ref") public ref: ElementRef

    ngDoCheck() {
        this.ref.nativeElement.innerText = indent(this.ref.nativeElement.innerText)
        Prism.highlightElement(this.ref.nativeElement)
    }
}