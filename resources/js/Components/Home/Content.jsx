// ========================================
// Author: Reezky
// Email: its@reezky.cloud
// ========================================
// Website: https://reezky.cloud/
// Github: https://github.com/itsreezky
// LinkedIn: https://www.linkedin.com/in/itsreezky/
// ========================================
// File: Content.jsx
// Path: resources/js/Components/Home/Content.jsx
// Created Date: 13/07/2024 13:58:43
// ========================================

import React from "react";

import Section from "./Components/Section";
import NewFood from "./Components/NewFood";
import Banner from "./Components/Banner";
import Trend from "./Components/Trend";
import Discount from "./Components/Discount";
import Services from "./Components/Services";

function HomeContent() {
    return (
        <>
            <Section />
            <NewFood />
            <Banner />
            <Trend />
            <Discount />
            <Services />
        </>
    );
}

export default HomeContent;
