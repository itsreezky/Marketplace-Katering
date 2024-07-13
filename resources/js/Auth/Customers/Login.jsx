// ========================================
// Author: Reezky
// Email: its@reezky.cloud
// ========================================
// Website: https://reezky.cloud/
// Github: https://github.com/itsreezky
// LinkedIn: https://www.linkedin.com/in/itsreezky/
// ========================================
// File: Login.jsx
// Path: resources/js/Auth/Customers/Login.jsx
// Created Date: 13/07/2024 17:31:59
// ========================================

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomersLogin() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await axios.post('http://localhost:8000/api/login', data);

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Berhasil",
                    text: "Anda berhasil masuk!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                setTimeout(() => {
                    navigate("/customers/profile");
                    window.location.reload();
                }, 3000);
            } else {
                throw new Error(response.data.message || "Login gagal");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: error.message,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div className="col mx-auto">
                    <div className="card shadow-none border">
                        <div className="card-body">
                            <div className="p-4">
                                <center>
                                    <img
                                        src="https://resource.reezky.cloud/reezky/itsreezky-icon.png"
                                        alt="itsReezky - Icon"
                                        width={125}
                                    />
                                </center>
                                <div className="text-center mb-4">
                                    <p className="mb-0">
                                        Silahkan masuk menggunakan akun anda.
                                    </p>
                                </div>
                                <div className="form-body">
                                    <form
                                        className="row g-3"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="col-12">
                                            <label
                                                htmlFor="inputEmailAddress"
                                                className="form-label"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmailAddress"
                                                name="email"
                                                placeholder="example@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label
                                                htmlFor="inputChoosePassword"
                                                className="form-label"
                                            >
                                                Password
                                            </label>
                                            <div
                                                className="input-group"
                                                id="show_hide_password"
                                            >
                                                <input
                                                    type="password"
                                                    className="form-control border-end-0"
                                                    id="inputChoosePassword"
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="input-group-text"
                                                >
                                                    <i className="bx bx-hide" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? "Loading..."
                                                        : "Masuk"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center">
                                                <p className="mb-0">
                                                    Belum punya akun?{" "}
                                                    <a href="/customers/register">
                                                        Daftar disini.
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomersLogin;
