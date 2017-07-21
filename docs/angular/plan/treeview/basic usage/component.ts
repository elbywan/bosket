import { Component } from "@angular/core"

@Component({
    template: `
        <div>
            <p>
                To use the TreeView, you have to <em><a href="#Usage#Import">import</a></em> it in your module, then use it in your templates.<br/>
                <br/>
                Appearance can be tweaked with <em><a href="#TreeView#Css">css</a></em> styles.
            </p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class TreeViewBasicUsage {
    code = `
        <TreeView

            // Required //

            [model]=            /* [the model array](#TreeView#Required props#model) */
            [category]=         /* [name of the property containing the children](#TreeView#Required props#category) */
            [(selection)]=      /* [the selection array, updated when the user (de)selects items](#TreeView#Required props#selection) */

            // Optional //

            [display]=          /* [custom item display](#TreeView#Optional props#display) */
            [displayComponent]= /* [wrap display in a custom component](#TreeView#Optional props#displayComponent) */
            [strategies]=       /* [behaviour on selection, click or fold](#TreeView#Optional props#strategies) */
            [key]=              /* [unique identifier](#TreeView#Optional props#key) */
            [sort]=             /* [sort items](#TreeView#Optional props#sort) */
            [disabled]=         /* [disable certain items](#TreeView#Optional props#disabled) */
            [search]=           /* [enables the search bar](#TreeView#Optional props#search) */
            [async]=            /* [how to treat asynchronous items](#TreeView#Optional props#async) */
            [dragndrop]=        /* [drag'n'drop configuration](#TreeView#Optional props#dragndrop) */
            (onDrag)=           /* [drag'n'drop drag callback](#TreeView#Optional props#onDrag) */
            (onDrop)=           /* [drag'n'drop drop callback](#TreeView#Optional props#onDrop) */
            (onCancel)=         /* [drag'n'drop cancel callback](#TreeView#Optional props#onCancel) */
            [noOpener]=         /* [hide opener 'arrow'](#TreeView#Optional props#noOpener) */
            [labels]=           /* [override default labels](#TreeView#Optional props#labels) */
            [css]=              /* [override default css classes](#TreeView#Optional props#css) */

        ></TreeView>
    `
}
