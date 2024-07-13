// ========================================
// Author: Reezky
// Email: its@reezky.cloud
// ========================================
// Website: https://reezky.cloud/
// Github: https://github.com/itsreezky
// LinkedIn: https://www.linkedin.com/in/itsreezky/
// ========================================
// File: App.jsx
// Path: resources/js/App.jsx
// Created Date: 13/07/2024 14:03:47
// ========================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayouts from "./Layouts/MainLayouts";
import HomeContent from "./Components/Home/Content";
import CustomersLogin from "./Auth/Customers/Login";
import CustomersRegister from "./Auth/Customers/CustomersRegister";
import MerchantsRegister from "./Auth/Customers/MerchantsRegister";
import CustomersProfile from "./Auth/Customers/Profile";

function App() {
    return (
        <Router>
            <MainLayouts>
                <Routes>
                    {/* HOMEPAGE routes */}
                    <Route path="/" element={<HomeContent />} />
                    {/* Customers routes */}
                    <Route
                        path="/customers/login"
                        element={<CustomersLogin />}
                    />
                    <Route
                        path="/customers/register"
                        element={<CustomersRegister />}
                    />
                    <Route
                        path="/merchants/register"
                        element={<MerchantsRegister />}
                    />
                    <Route
                        path="/customers/profile"
                        element={<CustomersProfile />}
                    />
                </Routes>
            </MainLayouts>
        </Router>
    );
}

export default App;
