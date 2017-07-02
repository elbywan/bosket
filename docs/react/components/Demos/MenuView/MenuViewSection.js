// @flow

import React from "react"

import { ComponentDemo } from "self/react/components/ComponentDemo/ComponentDemo"
import { MenuViewWindow } from "./MenuViewWindow"

export const MenuViewSection = () =>
    <ComponentDemo
        componentName="Side panel menu"
        description={ <p>A nested menu featuring ancestors selection, custom display and transitions.</p> }
        files={[
            "./components/Demos/MenuView/MenuViewDemo.js",
            "./components/Demos/MenuView/MenuViewDemo.css",
            "./components/Demos/MenuView/MenuViewWindow.js",
            "./components/Demos/MenuView/MenuViewWindow.css",
            "../common/models/MenuViewModel.js"
        ]}>
        <MenuViewWindow/>
    </ComponentDemo>
