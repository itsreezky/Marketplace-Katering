import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../Controllers/UserContext";

const RegisterForm = ({ userType }) => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
                `${import.meta.env.VITE_API_BASE_URL}/register`,
                { ...formData, role: userType }
            );
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            Swal.fire("Success", "Account created successfully!", "success");
            navigate(
                userType === "customer"
                    ? "/customers/profile"
                    : "/merchants/profile"
            );
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                Swal.fire(
                    "Error",
                    "Validation failed. Check your input.",
                    "error"
                );
            } else {
                Swal.fire(
                    "Error",
                    "An unexpected error occurred. Try again!",
                    "error"
                );
            }
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
                                        Register{" "}
                                        {userType.charAt(0).toUpperCase() +
                                            userType.slice(1)}
                                    </h4>
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
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.name && (
                                                <div className="text-danger">
                                                    {errors.name[0]}
                                                </div>
                                            )}
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
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.email && (
                                                <div className="text-danger">
                                                    {errors.email[0]}
                                                </div>
                                            )}
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
                                                    className="form-control"
                                                    id="inputChoosePassword"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {errors.password && (
                                                    <div className="text-danger">
                                                        {errors.password[0]}
                                                    </div>
                                                )}
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
                                                        : "Register"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center">
                                                <p className="mb-0">
                                                    Already have an account?{" "}
                                                    <Link
                                                        to={`/${userType}s/login`}
                                                    >
                                                        Login here.
                                                    </Link>
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
};

export default RegisterForm;
