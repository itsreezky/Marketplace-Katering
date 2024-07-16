import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faShop,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useAuth } from "../../Controllers/AuthContext";

// Menu Data
const merchantMenu = [
    { name: "Dashboard", link: "/" },
    { name: "Profile", link: "/merchants/profile" },
    { name: "Kelola Menu", link: "/merchants/menu" },
    { name: "Kelola Order", link: "/merchants/orders" },
    { name: "Invoices", link: "/merchants/invoices" },
];

const customerMenu = [
    { name: "Dashboard", link: "/" },
    { name: "Profile", link: "/customers/profile" },
    { name: "Cari Catering", link: "/customers/search-catering" },
    { name: "Orderan Saya", link: "/customers/orders" },
    { name: "Invoices", link: "/customers/invoices" },
];

const guestMenu = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
];

// Helper function to render menu items
const renderMenu = (menu) =>
    menu.map((item, index) => (
        <li key={index}>
            <Link to={item.link}>{item.name}</Link>
        </li>
    ));

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: "Konfirmasi Logout",
            text: "Apakah Anda yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, logout!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire(
                    "Logged out!",
                    "Anda telah berhasil logout.",
                    "success"
                );
                navigate("/");
            }
        });
    };

    let menu;
    if (user) {
        menu = user.role === "Merchant" ? merchantMenu : customerMenu;
    } else {
        menu = guestMenu;
    }

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-lg-2">
                        <div className="header__logo ms-3">
                            <span className="fs-7 fw-bold">
                                MARKETPLACE KATERING
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                        <center>
                            <nav className="header__menu">
                                <ul>{renderMenu(menu)}</ul>
                            </nav>
                        </center>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__right">
                            <div className="header__right__auth">
                                {user ? (
                                    <>
                                        <span>
                                            {user.nama}
                                            <span className="ms-1 text-success">
                                                ({user.role})
                                            </span>
                                        </span>
                                        <b className="ms-2">-</b>
                                        <button
                                            className="btn btn-link"
                                            onClick={handleLogout}
                                        >
                                            <small>Keluar</small>
                                            <FontAwesomeIcon
                                                className="ms-2"
                                                icon={faRightFromBracket}
                                            />
                                        </button>
                                    </>
                                ) : (
                                    <div className="btn-group">
                                        <div className="dropdown me-3">
                                            <button
                                                className="btn btn-outline-dark btn-sm dropdown-toggle px-3 radius-30"
                                                type="button"
                                                onClick={() =>
                                                    setLoginDropdownOpen(
                                                        !loginDropdownOpen
                                                    )
                                                }
                                            >
                                                Masuk
                                            </button>
                                            {loginDropdownOpen && (
                                                <ul className="dropdown-menu list-group show">
                                                    <li className="list-group-item">
                                                        <Link
                                                            className="dropdown-item text-success"
                                                            to="/customers/login"
                                                            onClick={() =>
                                                                setLoginDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                className="ms-auto"
                                                                icon={faUser}
                                                            />{" "}
                                                            Pelanggan
                                                        </Link>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <Link
                                                            className="dropdown-item text-danger"
                                                            to="/merchants/login"
                                                            onClick={() =>
                                                                setLoginDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            {" "}
                                                            <FontAwesomeIcon
                                                                className="ms-auto"
                                                                icon={faShop}
                                                            />{" "}
                                                            Merchant
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-outline-primary btn-sm dropdown-toggle px-3 radius-30"
                                                type="button"
                                                onClick={() =>
                                                    setRegisterDropdownOpen(
                                                        !registerDropdownOpen
                                                    )
                                                }
                                            >
                                                Daftar
                                            </button>
                                            {registerDropdownOpen && (
                                                <ul className="dropdown-menu list-group show">
                                                    <li className="list-group-item">
                                                        <Link
                                                            className="dropdown-item text-success"
                                                            to="/customers/register"
                                                            onClick={() =>
                                                                setRegisterDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                className="ms-auto"
                                                                icon={faUser}
                                                            />{" "}
                                                            Pelanggan
                                                        </Link>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <Link
                                                            className="dropdown-item text-danger"
                                                            to="/merchants/register"
                                                            onClick={() =>
                                                                setRegisterDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                className="ms-auto"
                                                                icon={faShop}
                                                            />{" "}
                                                            Merchant
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
