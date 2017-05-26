import "./MenuTreeSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"
import { MenuTree } from "bosket/react"
import { css } from "bosket/tools/css"

import model from "../../../../common/models/MenuTreeModel"

export class MenuTreeSection extends React.PureComponent {

    state = {
        model: model,
        category: "menu",
        name: "name",
        display: item =>
            <span><i className={ "fa " + item.icon }></i><span>{ item.name }</span></span>,
        selection: [],
        onSelect: _ => { this.setState({ selection: _ }) },
        transition: {
            transitionName: "MenuTreeTransition",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        }
    }

    render = () =>
        <ComponentSection
            componentName="MenuTree"
            description={ <p>A nested menu featuring ancestors selection, custom display and transitions.</p> }
            files={[
                "./react/components/Sections/MenuTree/MenuTreeSection.js",
                "./react/components/Sections/MenuTree/MenuTreeSection.css",
                "./common/models/MenuTreeModel.js"
            ]}>

            <div className="MenuTreeSection window">
                <div className={ "MenuTreeSection side-panel " + css.classes({ opened: this.state.opened }) }>
                    <MenuTree { ...this.state }></MenuTree>
                </div>
                <div className="MenuTreeSection upperBar">
                    <div className="MenuTreeSection opener"
                        onClick={ _ => this.setState({ opened: !this.state.opened }) }>
                        <i className={ "fa " + css.classes({
                            "fa-bars": !this.state.opened,
                            "fa-times": this.state.opened
                        })}></i>
                    </div>
                    <div className="MenuTreeSection title">Menu demo</div>
                </div>
                <div className={ "MenuTreeSection content " + css.classes({ opened: this.state.opened })}>
                    { this.renderContent(this.state.selection[this.state.selection.length - 1]) }
                </div>
            </div>
         </ComponentSection>

    renderContent = item => !item ?
        <article><h4>Pick an item.</h4></article> :
        <div>
            <h3><i className={ "fa " + item.icon }></i>{ item.name }</h3>
            <article>
                <p> A bunch of { item.name } options. </p>
                <div className="MenuTreeSection children">{ !item.menu ? null : item.menu.map(menuItem =>
                    <h4 key={ menuItem.name }>
                        <a onClick={ ev => this.setState({ selection: [ ...this.state.selection, menuItem ]})}>
                            <i className={ "fa " + menuItem.icon }></i>{ menuItem.name }
                        </a>
                    </h4>
                )}</div>
            </article>
        </div>


}