// ========================================
// Author: Reezky
// Email: its@reezky.cloud
// ========================================
// Website: https://reezky.cloud/
// Github: https://github.com/itsreezky
// LinkedIn: https://www.linkedin.com/in/itsreezky/
// ========================================
// File: MainLayouts.jsx
// Path: resources/js/Layouts/MainLayouts.jsx
// Created Date: 13/07/2024 12:17:54
// ========================================

import React, { useState } from "react";

import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";

const MainLayouts = ({ children }) => {
    const [menuType, setMenuType] = useState("merchant"); // "merchant" or "office"
    return (
        <>
            <Header menuType={menuType} />
            {children}
            <Footer />
        </>
    );
};

export default MainLayouts;
