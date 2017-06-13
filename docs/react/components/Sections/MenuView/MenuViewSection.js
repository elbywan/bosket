// @flow

import "./MenuViewSection.css"

import React from "react"

// Css tools
import { css } from "bosket/tools/css"
// Bsoket MenuView demo
import { MenuViewDemo } from "./MenuViewDemo"

import { ComponentSection } from "self/react/components/ComponentSection/ComponentSection"

export class MenuViewSection extends React.PureComponent {

    state = {
        selection: [],
        opened: false
    }

    render = () =>
        <ComponentSection
            componentName="Side panel menu"
            description={ <p>A nested menu featuring ancestors selection, custom display and transitions.</p> }
            files={[
                "./components/Sections/MenuView/MenuViewDemo.js",
                "./components/Sections/MenuView/MenuViewDemo.css",
                "./components/Sections/MenuView/MenuViewSection.js",
                "./components/Sections/MenuView/MenuViewSection.css",
                "../common/models/MenuViewModel.js"
            ]}>

            <div className="MenuViewSection window">
                <div className={ "MenuViewSection side-panel " + css.classes({ opened: this.state.opened }) }>
                    { /* The menu is rendered here */ }
                    <MenuViewDemo
                        selection={ this.state.selection }
                        updateSelection={ _ => this.setState({ selection: _ }) }></MenuViewDemo>
                </div>
                <div className="MenuViewSection upperBar">
                    <div className="MenuViewSection opener"
                        onClick={ _ => this.setState({ opened: !this.state.opened }) }>
                        <i className={ "fa " + css.classes({
                            "fa-bars": !this.state.opened,
                            "fa-times": this.state.opened
                        })}></i>
                    </div>
                    <div className="MenuViewSection title">Menu Tree</div>
                </div>
                <div className={ "MenuViewSection content " + css.classes({ opened: this.state.opened })}>
                    { this.renderContent(this.state.selection[this.state.selection.length - 1]) }
                </div>
            </div>
         </ComponentSection>

    renderContent = (item: Object) => !item ? <article><h4>Pick an item.</h4></article> :
        <div>
            <h3><i className={ "fa " + item.icon }></i>{ item.name }</h3>
            <article>
                <p> A bunch of { item.name } options. </p>
                <div className="MenuViewSection children">{ !item.menu ? null : item.menu.map(menuItem =>
                    <h4 key={ menuItem.name }>
                        <a onClick={ ev => this.setState({ selection: [ ...this.state.selection, menuItem ]})}>
                            <i className={ "fa " + menuItem.icon }></i>{ menuItem.name }
                        </a>
                    </h4>
                )}</div>
            </article>
        </div>
}
