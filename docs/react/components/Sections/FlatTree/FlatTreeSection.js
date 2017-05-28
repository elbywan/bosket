import "./FlatTreeSection.css"

import React from "react"
import { ComponentSection } from "../../ComponentSection/ComponentSection"
import { array, css, string } from "bosket/tools"
import model from "../../../../common/models/FlatTreeModel"

import { FlatTree } from "bosket/react"


export class FlatTreeSection extends React.PureComponent {

    state = {
        model: model,
        category: "items",
        name: "label",
        selection: [],
        limit: 0,
        onSelect: _ => { this.setState({ selection: _ }) },
        search: input => i => !i.items && string(i.label).contains(input),
        display: item =>
            !item.items ? item.label :
            <div onClick={ ev => this.toggleCategory(item) }>{ item.label }</div>,
        formData: {}
    }

    get openedCss() { return css.classes({ opened: this.state.opened }) }
    selectAll(item) {
        const input = this.state.search &&
            document.querySelector(".FlatTree input[type='search']").value

        const items = !input ?
            item.items :
            item.items.filter(this.state.search(input))

        this.setState({
            selection: [
                ...array(this.state.selection).notIn(items),
                ...items ]
        })
    }
    deselectAll(item) {
        const input = this.state.search &&
            document.querySelector(".FlatTree input[type='search']").value

        const items = !input ?
            item.items :
            item.items.filter(this.state.search(input))

        this.setState({
            selection: array(this.state.selection).notIn(items)
        })
    }
    toggleCategory(item) {
        const input = this.state.search &&
            document.querySelector(".FlatTree input[type='search']").value

        const items = !input ?
            item.items :
            item.items.filter(this.state.search(input))

        if(array(items).allIn(this.state.selection) ||
                this.state.limit &&
                items.length > this.state.limit - this.state.selection.length) {
            this.setState({ selection: array(this.state.selection).notIn(items) })
        } else {
            this.setState({ selection: [
                ...array(this.state.selection).notIn(items),
                ...items ]})
        }
    }

    validate() {
        return this.state.formData.firstName &&
            this.state.formData.lastName &&
            this.state.selection.length > 0
    }

    render = () =>
        <ComponentSection
            componentName="FlatTree"
            description={ <p>Flattened tree demo in the form of a combo box.</p> }
            files={[
                "./react/components/Sections/FlatTree/FlatTreeSection.js",
                "./react/components/Sections/FlatTree/FlatTreeSection.css",
                "./common/models/FlatTreeModel.js"
            ]}>
            <div className="FlatTreeSection">
                <h3>Some kind of online <em>form</em>.</h3>

                <div className="form-like">
                    <div className="form-line">
                        <label>First name</label>
                        <input type="text"
                            value={ this.state.formData.firstName }
                            onChange={ ev =>
                                this.setState({ formData: { ...this.state.formData, firstName: ev.target.value }})}/>
                    </div>

                    <div className="form-line">
                        <label>Last name</label>
                        <input type="text"
                            value={ this.state.formData.lastName }
                            onChange={ ev =>
                                this.setState({ formData: { ...this.state.formData, lastName: ev.target.value }})}/>
                    </div>

                    <div className="form-line">
                        <label>Number of things you like (0 = any)</label>
                        <input type="number" min="0" value={ this.state.limit }
                            onChange={ ev => this.setState({ limit: parseInt(ev.target.value, 10) })}/>
                    </div>

                    <div className="form-line">
                        <label>Things you like</label>
                        <div className={ "comboBox " + this.openedCss }>
                            <button onClick={ev => this.setState({ opened: !this.state.opened })}>
                                Click me<span className="comboBoxOpener"><i className="fa fa-chevron-right"></i></span>
                            </button>
                            <div className="container">
                                <FlatTree { ...this.state }></FlatTree>
                            </div>
                        </div>
                    </div>
                </div>

                { this.validate() ?
                <div>
                    <p>
                        Your name is <em>{ this.state.formData.firstName } { this.state.formData.lastName }&nbsp;</em>
                        and {
                            this.state.selection.length === 1 ?
                                "this is the thing you like :" :
                                <span>these are the <em>{ this.state.selection.length }</em> things you like :</span>
                        }
                    </p>
                    <div className="inline-row">
                        { this.state.selection.map(s =>
                            <em key={ s.label }>{s.label}</em>
                        ) }
                    </div>
                </div> :
                <p>Please complete the <em>form</em> above.</p>
                }
            </div>
        </ComponentSection>
}