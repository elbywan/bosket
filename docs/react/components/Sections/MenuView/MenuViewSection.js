// @flow

import React from "react"

import { ComponentSection } from "self/react/components/ComponentSection/ComponentSection"
import { MenuViewWindow } from "./MenuViewWindow"

export const MenuViewSection = () =>
    <ComponentSection
        componentName="Side panel menu"
        description={ <p>A nested menu featuring ancestors selection, custom display and transitions.</p> }
        files={[
            "./components/Sections/MenuView/MenuViewDemo.js",
            "./components/Sections/MenuView/MenuViewDemo.css",
            "./components/Sections/MenuView/MenuViewWindow.js",
            "./components/Sections/MenuView/MenuViewWindow.css",
            "../common/models/MenuViewModel.js"
        ]}>
        <MenuViewWindow/>
    </ComponentSection>
