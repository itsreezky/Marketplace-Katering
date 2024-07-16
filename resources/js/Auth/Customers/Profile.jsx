import React, { useState, useEffect } from "react";
import { useAuth } from "../../Controllers/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Profile() {
    const { user } = useAuth();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noHp, setNoHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [fotoProfile, setFotoProfile] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setNama(user.nama);
            setEmail(user.email);
            setNoHp(user.details.no_hp);
            setAlamat(user.details.alamat);
            setFotoProfile(
                user.details.foto_profile ||
                    "https://resource.reezky.cloud/reezky/itsreezky-icon.png"
            );
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nama || !email || !noHp || !alamat) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Semua kolom harus diisi!",
            });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/update-user`,
                {
                    nama,
                    email,
                    no_hp: noHp,
                    alamat,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: response.data.message,
            });
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal memperbarui profil, silakan coba lagi!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("foto_profile", file);

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/update-photo`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setFotoProfile(URL.createObjectURL(file));
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: response.data.message,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal memperbarui foto profil, silakan coba lagi!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="container">
                    <div className="main-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img
                                                src={
                                                    fotoProfile
                                                        ? `${
                                                              import.meta.env
                                                                  .VITE_PHOTO_PROFILE_BASE_URL
                                                          }/${fotoProfile}`
                                                        : "https://resource.reezky.cloud/reezky/itsreezky-icon.png"
                                                }
                                                alt="User Profile"
                                                className="rounded-circle p-1"
                                                width={110}
                                            />
                                            <div className="mt-3">
                                                <h4>{nama}</h4>
                                                <p className="text-secondary mb-1">
                                                    Customer
                                                </p>
                                                <p className="text-muted font-size-sm">
                                                    {alamat}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={handlePhotoChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">
                                                        Nama Lengkap
                                                    </h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={nama}
                                                        onChange={(e) =>
                                                            setNama(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">
                                                        Email
                                                    </h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">
                                                        No. HP
                                                    </h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={noHp}
                                                        onChange={(e) =>
                                                            setNoHp(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">
                                                        Alamat
                                                    </h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={alamat}
                                                        onChange={(e) =>
                                                            setAlamat(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3" />
                                                <div className="col-sm-9 text-secondary">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary px-4"
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />{" "}
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            "Update Data"
                                                        )}
                                                    </button>
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
        </div>
    );
}

export default Profile;
