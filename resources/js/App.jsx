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

// Main Layout
import MainLayouts from "./Layouts/MainLayouts";
// Dashboard Content
import HomeContent from "./Components/Home/Content";
// Customers
import CustomersLogin from "./Auth/CustomersLogin";
import CustomersRegister from "./Auth/CustomersRegister";
import CustomersProfile from "./Auth/CustomersProfile";
// Merchants
import MerchantsLogin from "./Auth/MerchantsLogin";
import MerchantsRegister from "./Auth/MerchantsRegister";
import MerchantsProfile from "./Auth/MerchantsProfile";
import MerchantsMenu from "./Auth/MerchantsMenu";
// Profile

function App() {
    return (
        <Router>
            <MainLayouts>
                <Routes>
                    {/* Home routes */}
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
                        path="/customers/profile"
                        element={<CustomersProfile />}
                    />
                    {/* Merchants routes */}
                    <Route
                        path="/merchants/login"
                        element={<MerchantsLogin />}
                    />
                    <Route
                        path="/merchants/register"
                        element={<MerchantsRegister />}
                    />
                    <Route
                        path="/merchants/profile"
                        element={<MerchantsProfile />}
                    />
                    <Route path="/merchants/menu" element={<MerchantsMenu />} />
                </Routes>
            </MainLayouts>
        </Router>
    );
}

export default App;
