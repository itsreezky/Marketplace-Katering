import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// Menu Data
const merchantMenu = [
    { name: "Dashboard", link: "/" },
    { name: "Profil Merchant", link: "#" },
    { name: "Menu Makanan", link: "#" },
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
            <a href={item.link}>{item.name}</a>
        </li>
    ));

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/user/profile"
                );
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/customers/logout");
            setUser(null);
            navigate("/");
            Swal.fire({
                icon: "success",
                title: "Logout Berhasil",
                text: "Anda telah berhasil logout!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
        } catch (error) {
            console.log(error);
        }
    };

    let menu;
    if (user) {
        menu = user.type === "merchant" ? merchantMenu : customerMenu;
    } else {
        menu = guestMenu;
    }

    return (
        <>
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2">
                            <div className="header__logo ms-3">
                                <span className="fs-7 fw-bold">
                                    MARKETPLACE KATERING{" "}
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
                        <div className="col-lg-3">
                            <div className="header__right">
                                <div className="header__right__auth">
                                    {user ? (
                                        <>
                                            <span className="me-2">
                                                {user.name} -
                                            </span>
                                            <a href="#" onClick={handleLogout}>
                                                Logout
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a href="/customers/login">
                                                Masuk Customer
                                            </a>
                                            <a href="/customers/register">
                                                Daftar Customer
                                            </a>
                                            <a href="/merchants/login">
                                                Masuk Merchant
                                            </a>
                                            <a href="/merchants/register">
                                                Daftar Merchant
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open">
                        <i className="fa fa-bars" />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
