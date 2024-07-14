import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Controllers/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

function CustomersProfile() {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        contact: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
            fetchProfile();
        } else {
            navigate("/");
        }
    }, [user, navigate]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProfile(response.data.profile);
            if (response.data.profile) {
                setFormData((prevData) => ({
                    ...prevData,
                    company: response.data.profile.company_name || "",
                    contact: response.data.profile.contact || "",
                    address: response.data.profile.address || "",
                }));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal mengambil data profil",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/customer/profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const updatedUser = {
                    ...user,
                    customer: response.data.customer,
                };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data profil berhasil diperbarui",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                throw new Error(
                    response.data.message || "Gagal memperbarui data profil"
                );
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
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

    if (!user) {
        return null;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                    src="https://resource.reezky.cloud/reezky/itsreezky-icon.png"
                                    alt="Admin"
                                    className="rounded-circle p-1"
                                    width={100}
                                />
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">
                                        {user.role === "customer"
                                            ? "Customer"
                                            : "Merchant"}
                                    </p>
                                    <p className="text-muted font-size-sm">
                                        {formData.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Nama Lengkap</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Perusahaan</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        disabled={user.role !== "customer"}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Kontak</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        disabled={user.role !== "customer"}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Alamat</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-9 text-secondary">
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Simpan"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomersProfile;
