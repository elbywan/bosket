import "./ComponentSection.css"
import React from "react"

export const ComponentSection = props =>
    <div className="ComponentSection section">
        <h3>{ props.componentName }</h3>
        <p> { props.description } </p>
        <div className="ComponentSection highlight">{ props.children }</div>
    </div>