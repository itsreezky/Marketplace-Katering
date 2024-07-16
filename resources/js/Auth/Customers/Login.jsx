import React, { useState, useEffect } from "react";
import { useAuth } from "../../Controllers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Login() {
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Anda berhasil login!",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate("/customers/profile");
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Login gagal, silakan coba lagi!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="d-flex align-items-center justify-content-center my-5">
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <div className="col mx-auto">
                            <div className="card radius-30 mb-0">
                                <div className="card-body">
                                    <div className="p-4">
                                        <div className="mb-3 text-center">
                                            <img
                                                src="https://resource.reezky.cloud/reezky/itsreezky-icon.png"
                                                width={120}
                                                alt="Reezky-Icon"
                                            />
                                        </div>
                                        <div className="text-center mb-4">
                                            <h5 className="">
                                                MARKETPLACE KATERING
                                            </h5>
                                            <h6>LOGIN PELANGGAN</h6>
                                            <p className="mb-0">
                                                Silakan isi detail di bawah ini
                                                untuk masuk ke akun Anda
                                            </p>
                                        </div>
                                        <div className="form-body">
                                            <form
                                                className="row g-3"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputEmail"
                                                        className="form-label"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="inputEmail"
                                                        placeholder="example@reezky.cloud"
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputChoosePassword"
                                                        className="form-label"
                                                    >
                                                        Kata Sandi
                                                    </label>
                                                    <div
                                                        className="input-group"
                                                        id="show_hide_password"
                                                    >
                                                        <input
                                                            type="password"
                                                            className="form-control border-end-0"
                                                            id="inputChoosePassword"
                                                            placeholder="Masukkan Kata Sandi"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <a
                                                            href="javascript:;"
                                                            className="input-group-text bg-transparent"
                                                        >
                                                            <i className="bx bx-hide" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexSwitchCheckChecked"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckChecked"
                                                        >
                                                            Ingat Saya
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
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
                                                                "Masuk"
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="text-center">
                                                        <p className="mb-0">
                                                            Tidak punya akun?{" "}
                                                            <Link to="/customers/register">
                                                                Daftar di sini
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
                    {/*end row*/}
                </div>
            </div>
        </div>
    );
}

export default Login;
