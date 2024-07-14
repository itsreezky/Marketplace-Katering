import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Controllers/UserContext";

const LoginForm = ({ userType }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                { ...formData, userType }
            );

            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            Swal.fire("Success", "Login successful!", "success");
            navigate(
                userType === "customer"
                    ? "/customers/profile"
                    : "/merchants/profile"
            );
        } catch (error) {
            Swal.fire("Error", "Login failed. Try again!", "error");
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
                                    <h4>
                                        Login{" "}
                                        {userType === "customer"
                                            ? "Customers"
                                            : "Merchants"}
                                    </h4>
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
                                                value={formData.email}
                                                onChange={handleChange}
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
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter Password"
                                                    required
                                                />
                                                <a
                                                    href="javascript:;"
                                                    className="input-group-text bg-transparent"
                                                >
                                                    <i className="bx bx-hide"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="flexSwitchCheckChecked"
                                                    defaultChecked
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexSwitchCheckChecked"
                                                >
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <Link to="/">Forgot Password?</Link>
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
                                                        : "Login"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-center my-3">
                                    <p className="mb-0">
                                        Belum punya akun?{" "}
                                        <Link
                                            to={`/${
                                                userType === "customer"
                                                    ? "customers"
                                                    : "merchants"
                                            }/register`}
                                        >
                                            Daftar Disini
                                        </Link>
                                    </p>
                                </div>
                                <div className="login-separater text-center mb-4">
                                    <span>OR SIGN IN WITH</span>
                                    <hr />
                                </div>
                                <div className="list-inline contacts-social text-center">
                                    <a
                                        href="javascript:;"
                                        className="list-inline-item bg-facebook text-white border-0"
                                    >
                                        <i className="bx bxl-facebook"></i>
                                    </a>
                                    <a
                                        href="javascript:;"
                                        className="list-inline-item bg-google text-white border-0"
                                    >
                                        <i className="bx bxl-google"></i>
                                    </a>
                                    <a
                                        href="javascript:;"
                                        className="list-inline-item bg-twitter text-white border-0"
                                    >
                                        <i className="bx bxl-twitter"></i>
                                    </a>
                                    <a
                                        href="javascript:;"
                                        className="list-inline-item bg-linkedin text-white border-0"
                                    >
                                        <i className="bx bxl-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-3 border-0">
                            <div className="text-center">
                                <p className="mb-0">
                                    © {new Date().getFullYear()}. itsReezky
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
