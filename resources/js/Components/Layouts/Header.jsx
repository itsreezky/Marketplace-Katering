import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../Controllers/UserContext";

// Menu Data
const merchantMenu = [
    { name: "Dashboard", link: "/" },
    { name: "Profil Merchant", link: "/merchants/profile" },
    { name: "Menu Makanan", link: "/merchants/menu" },
    { name: "Pesanan", link: "#" },
    { name: "Invoice", link: "#" },
];

const customerMenu = [
    { name: "Dashboard", link: "/" },
    { name: "Profil", link: "/customers/profile" },
    { name: "Pencarian Katering", link: "#" },
    { name: "Pembelian", link: "#" },
    { name: "Invoice", link: "#" },
];

const guestMenu = [{ name: "Dashboard", link: "/" }];

// Helper function to render menu items
const renderMenu = (menu) =>
    menu.map((item, index) => (
        <li key={index}>
            <Link to={item.link}>{item.name}</Link>
        </li>
    ));

const Header = () => {
    const { user, setUser } = useUser();
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [setUser]);

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
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
                Swal.fire(
                    "Logged out!",
                    "You have been logged out.",
                    "success"
                );
            }
        });
    };

    let menu;
    if (user) {
        menu = user.type === "merchant" ? merchantMenu : customerMenu;
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
                            </span>{" "}
                            - <small>itsReezky</small>
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
                                        <span className="me-2">
                                            {user.name} -
                                        </span>
                                        <button
                                            className="btn btn-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="btn-group">
                                        <div className="dropdown me-3">
                                            <button
                                                className="btn btn-outline-dark btn-sm dropdown-toggle"
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
                                                <ul className="dropdown-menu show">
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/customers/login"
                                                            onClick={() =>
                                                                setLoginDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Pelanggan
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/merchants/login"
                                                            onClick={() =>
                                                                setLoginDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Merchant
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-outline-success btn-sm dropdown-toggle"
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
                                                <ul className="dropdown-menu show">
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/customers/register"
                                                            onClick={() =>
                                                                setRegisterDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Pelanggan
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/merchants/register"
                                                            onClick={() =>
                                                                setRegisterDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
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
