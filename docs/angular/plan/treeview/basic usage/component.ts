import { Component } from "@angular/core"

@Component({
    template: `
        <div>
            <p>
                To use the TreeView you must first <em><a href="#Usage#Import">import</a></em> it in your own Angular module, then place the component in your templates to render it.<br/>
                <br/>
                Appearance can be tweaked using <em><a href="#TreeView#Css">css</a></em>.
            </p>
            <syntax-highlight language="typescript">{{code}}</syntax-highlight>
        </div>
    `
})
export class TreeViewBasicUsage {
    code = `
        <TreeView

            // Required //

            [model]=            /* [the data model](#TreeView#Required properties#model) */
            [category]=         /* [name of the property containing the children](#TreeView#Required properties#category) */
            [(selection)]=      /* [the selection array, updated when the user (de)selects items](#TreeView#Required properties#selection) */

            // Optional //

            [display]=          /* [customize output for each element of the tree](#TreeView#Optional properties#display) */
            [displayComponent]= /* [wrap output inside a component of your choice](#TreeView#Optional properties#displayComponent) */
            [strategies]=       /* [behaviour on selection, click or fold](#TreeView#Optional properties#strategies) */
            [key]=              /* [unique identifier](#TreeView#Optional properties#key) */
            [sort]=             /* [sort items](#TreeView#Optional properties#sort) */
            [disabled]=         /* [disable certain items](#TreeView#Optional properties#disabled) */
            [search]=           /* [enables the search bar](#TreeView#Optional properties#search) */
            [async]=            /* [how to treat asynchronous items](#TreeView#Optional properties#async) */
            [dragndrop]=        /* [drag'n'drop configuration](#TreeView#Optional properties#dragndrop) */
            (onDrag)=           /* [drag'n'drop drag callback](#TreeView#Optional properties#onDrag) */
            (onDrop)=           /* [drag'n'drop drop callback](#TreeView#Optional properties#onDrop) */
            (onCancel)=         /* [drag'n'drop cancel callback](#TreeView#Optional properties#onCancel) */
            [noOpener]=         /* [hide opener 'arrow'](#TreeView#Optional properties#noOpener) */
            [labels]=           /* [override default labels](#TreeView#Optional properties#labels) */
            [css]=              /* [override default css classes](#TreeView#Optional properties#css) */

        ></TreeView>
    `
}
