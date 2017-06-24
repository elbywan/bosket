// @flow

import React from "react"

import { FlatViewWindow } from "./FlatViewWindow"
import { ComponentSection } from "self/react/components/ComponentSection/ComponentSection"

export const FlatViewSection = () =>
    <ComponentSection
        componentName="Drop down category list"
        description={ <p>Flattened tree demo in the form of a combo box.</p> }
        files={[
            "./components/Sections/FlatView/FlatViewDemo.js",
            "./components/Sections/FlatView/FlatViewDemo.css",
            "./components/Sections/FlatView/FlatViewWindow.js",
            "./components/Sections/FlatView/FlatViewWindow.css",
            "../common/models/FlatViewModel.js"
        ]}>
        <FlatViewWindow/>
    </ComponentSection>
