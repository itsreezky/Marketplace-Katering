// ========================================
// Author: Reezky
// Email: its@reezky.cloud
// ========================================
// Website: https://reezky.cloud/
// Github: https://github.com/itsreezky
// LinkedIn: https://www.linkedin.com/in/itsreezky/
// ========================================
// File: AppController.jsx
// Path: resources/js/Controllers/AppController.jsx
// Created Date: 13/07/2024 11:13:41
// ========================================

// ================ IMPORTING ASSETS =================== //
import "bootstrap/dist/css/bootstrap.min.css"; // Mengimpor stylesheet Bootstrap
import "@fortawesome/fontawesome-free/css/all.min.css"; // Mengimpor stylesheet FontAwesome
import "elegant-icons/style.css"; // Mengimpor stylesheet Elegant Icons
import "jquery-ui/themes/base/all.css"; // Mengimpor stylesheet jQuery UI
import "magnific-popup/dist/magnific-popup.css"; // Mengimpor stylesheet Magnific Popup
import "owl.carousel/dist/assets/owl.carousel.css"; // Mengimpor stylesheet Owl Carousel
import "owl.carousel/dist/assets/owl.theme.default.css"; // Mengimpor stylesheet tema default Owl Carousel
import "slicknav/dist/slicknav.min.css"; // Mengimpor stylesheet SlickNav
import "../bootstrap"; // Mengimpor konfigurasi bootstrap
import "../Assets/app.css"; // Mengimpor komponen utama CSS
// ================ IMPORTING ASSETS =================== //

import React from "react"; // Mengimpor React
import ReactDOM from "react-dom/client"; // Mengimpor ReactDOM untuk rendering aplikasi
import App from "../App"; // Mengimpor komponen utama App

// Menggunakan createRoot dari 'react-dom/client' untuk membuat root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render komponen App
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
