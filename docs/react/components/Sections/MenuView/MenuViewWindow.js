// @flow


import React from "react"

// Style
import "./MenuViewWindow.css"
// Css tools
import { css } from "bosket/tools/css"
// Bosket MenuView demo
import { MenuViewDemo } from "./MenuViewDemo"

export class MenuViewWindow extends React.PureComponent {

    state = {
        selection: [],
        opened: false
    }

    render = () =>
        <div>
            <div className="MenuViewWindow window">
                <div className={ "MenuViewWindow side-panel " + css.classes({ opened: this.state.opened }) }>
                    { /* The menu is rendered here */ }
                    <MenuViewDemo
                        selection={ this.state.selection }
                        updateSelection={ _ => this.setState({ selection: _ }) }></MenuViewDemo>
                </div>
                <div className="MenuViewWindow upperBar">
                    <div className="MenuViewWindow opener"
                        onClick={ _ => this.setState({ opened: !this.state.opened }) }>
                        <i className={ "fa " + css.classes({
                            "fa-bars": !this.state.opened,
                            "fa-times": this.state.opened
                        })}></i>
                    </div>
                    <div className="MenuViewWindow title">Menu Tree</div>
                </div>
                <div className={ "MenuViewWindow content " + css.classes({ opened: this.state.opened })}>
                    { this.renderContent(this.state.selection[this.state.selection.length - 1]) }
                </div>
            </div>
         </div>

    renderContent = (item: Object) => !item ? <article><h4>Pick an item.</h4></article> :
        <div>
            <h3><i className={ "fa " + item.icon }></i>{ item.name }</h3>
            <article>
                <p> A bunch of { item.name } options. </p>
                <div className="MenuViewWindow children">{ !item.menu ? null : item.menu.map(menuItem =>
                    <h4 key={ menuItem.name }>
                        <a onClick={ ev => this.setState({ selection: [ ...this.state.selection, menuItem ]})}>
                            <i className={ "fa " + menuItem.icon }></i>{ menuItem.name }
                        </a>
                    </h4>
                )}</div>
            </article>
        </div>
}
