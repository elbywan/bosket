import React from "react"

import { MenuViewSection } from "self/react/components/Sections"

export default {
    title: "MenuView",
    content:
        <p>
            A preset best suited for nested menus with automatic item folding/unfolding and ancestors selection.
        </p>,
    subs: [{
        title: "Demo",
        content:
            <div>
                <h4><button className="basic-button">
                    <i className="fa fa-download"></i>
                    <a download="BosketMenuView.css" href="./components/Sections/MenuView/MenuViewDemo.css">Download stylesheet</a>
                </button></h4>
                <MenuViewSection></MenuViewSection>
            </div>
    }]
}
