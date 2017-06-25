// @flow

// React
import React from "react"

// Style
import "./FlatViewWindow.css"
// Css tools
import { css } from "bosket/tools"
// Demo component
import { FlatViewDemo } from "./FlatViewDemo"

export class FlatViewWindow extends React.PureComponent {

    state = {
        selection: [],
        limit: 0,
        onSelect: (_: Object[]) => { this.setState({ selection: _ }) },
        formData: { firstName: "", lastName: "" },
        opened: false
    }

    render = () =>
        <div>
            <div className="FlatViewWindow">
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
                                { /* The combo-box is rendered here */ }
                                <FlatViewDemo
                                    selection={ this.state.selection }
                                    onSelect={ this.state.onSelect }
                                    limit={ this.state.limit }>
                                </FlatViewDemo>
                            </div>
                        </div>
                    </div>
                </div>

                { this.validate() ?
                    <div>
                        <p className="center-text">
                            Your name is <em>{ this.state.formData.firstName } { this.state.formData.lastName }&nbsp;</em>
                            and {
                                this.state.selection.length === 1 ?
                                    "this is the thing you like :" :
                                    <span>these are the <em>{ this.state.selection.length }</em> things you like :</span>
                            }
                        </p>
                        <div className="inline-row center-text">
                            { this.state.selection.map(s =>
                                <em key={ s.label }>{s.label}</em>
                            ) }
                        </div>
                    </div> :
                    <p className="center-text">Please complete the <em>form</em> above.</p>
                }
            </div>
        </div>

    get openedCss() : string { return css.classes({ opened: this.state.opened }) }

    validate() {
        return this.state.formData.firstName &&
            this.state.formData.lastName &&
            this.state.selection.length > 0
    }
}
