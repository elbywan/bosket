import { Component } from "@angular/core"

@Component({
    template: `
        <div>
            <h4>
                <a download="BosketTreeView.css" href="./components/Demos/TreeView/TreeViewDemo.css" class="anchor-button basic-button">
                    <i class="fa fa-download"></i>Download stylesheet
                </a>
            </h4>
            <treeview-section></treeview-section>
        </div>`
})
export class TreeViewDemo {}
