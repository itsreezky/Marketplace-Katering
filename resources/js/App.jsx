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
// Created Date: 16/07/2024 23:21:35
// ========================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Controllers/AuthContext";
import { DataProvider } from "./Controllers/DataContext";

// Main Layout
import MainLayouts from "./Layouts/MainLayouts";
// Dashboard Content
import HomeContent from "./Components/Home/Content";
// Customers
import CustomersRegister from "./Auth/Customers/Register";
import CustomersLogin from "./Auth/Customers/Login";
import CustomersProfile from "./Auth/Customers/Profile";

function App() {
    return (
        <Router>
            <AuthProvider>
                <DataProvider>
                    <MainLayouts>
                        <Routes>
                            {/* Home routes */}
                            <Route path="/" element={<HomeContent />} />
                            {/* Customers routes */}
                            <Route
                                path="/customers/register"
                                element={<CustomersRegister />}
                            />
                            <Route
                                path="/customers/login"
                                element={<CustomersLogin />}
                            />
                            <Route
                                path="/customers/profile"
                                element={<CustomersProfile />}
                            />
                        </Routes>
                    </MainLayouts>
                </DataProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
