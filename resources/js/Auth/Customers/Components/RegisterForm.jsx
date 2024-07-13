import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm({ userType }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            contact: formData.get("contact"),
            address: formData.get("address"),
            type: userType,
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/register",
                data
            );

            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Pendaftaran Berhasil",
                    text: "Akun Anda telah terdaftar! Selamat Datang.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
                setTimeout(() => {
                    navigate(`/${userType}s/login`);
                }, 3000);
            } else {
                throw new Error(response.data.message || "Pendaftaran gagal");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Pendaftaran Gagal",
                text: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
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
                                        Silahkan mengisi form pendaftaran untuk
                                        melanjutkan.
                                    </p>
                                </div>
                                <div className="form-body">
                                    <form
                                        className="row g-3"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="col-12">
                                            <label
                                                htmlFor="inputName"
                                                className="form-label"
                                            >
                                                Nama
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                name="name"
                                                required
                                            />
                                        </div>
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
                                                placeholder="jhon@example.com"
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
                                            <label
                                                htmlFor="inputContact"
                                                className="form-label"
                                            >
                                                Kontak
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputContact"
                                                name="contact"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label
                                                htmlFor="inputAddress"
                                                className="form-label"
                                            >
                                                Alamat
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="inputAddress"
                                                name="address"
                                            />
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
                                                        : "Daftar"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center">
                                                <p className="mb-0">
                                                    Sudah punya akun?{" "}
                                                    <a
                                                        href={`/${userType}s/login`}
                                                    >
                                                        Masuk disini.
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

export default RegisterForm;
