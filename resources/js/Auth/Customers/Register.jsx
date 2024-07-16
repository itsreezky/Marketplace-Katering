import React, { useState, useEffect } from "react";
import { useAuth } from "../../Controllers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Register() {
    const { register, currentUser } = useAuth();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [noHp, setNoHp] = useState("");
    const [namaKantor, setNamaKantor] = useState("");
    const [alamat, setAlamat] = useState("");
    const [fotoProfile, setFotoProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !nama ||
            !email ||
            !password ||
            !confirmPassword ||
            !noHp ||
            !namaKantor ||
            !alamat
        ) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Semua kolom harus diisi bertanda * wajib diisi !",
            });
            return;
        }

        if (password !== confirmPassword) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Password tidak cocok!",
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", "customer");
        formData.append("no_hp", noHp);
        formData.append("nama_kantor", namaKantor);
        formData.append("alamat", alamat);
        if (fotoProfile) {
            formData.append("foto_profile", fotoProfile);
        }

        try {
            await register(formData);
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Registrasi berhasil!",
            });
            navigate("/customers/login");
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Registrasi gagal, silakan coba lagi!",
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
                                                REGISTRASI PELANGGAN
                                            </h5>
                                            <h6>PORTAL</h6>
                                            <p className="mb-0">
                                                Silakan isi detail di bawah ini
                                                untuk membuat akun Anda
                                            </p>
                                        </div>
                                        <div className="form-body">
                                            <form
                                                className="row g-3"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputNama"
                                                        className="form-label"
                                                    >
                                                        Nama
                                                    </label>
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputNama"
                                                        placeholder="Contoh: Reezky"
                                                        value={nama}
                                                        onChange={(e) =>
                                                            setNama(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputEmail"
                                                        className="form-label"
                                                    >
                                                        Email
                                                    </label>
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
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
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
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
                                                    <label
                                                        htmlFor="inputConfirmPassword"
                                                        className="form-label"
                                                    >
                                                        Konfirmasi Kata Sandi
                                                    </label>
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
                                                    <div
                                                        className="input-group"
                                                        id="show_hide_password"
                                                    >
                                                        <input
                                                            type="password"
                                                            className="form-control border-end-0"
                                                            id="inputConfirmPassword"
                                                            placeholder="Masukkan Kata Sandi"
                                                            value={
                                                                confirmPassword
                                                            }
                                                            onChange={(e) =>
                                                                setConfirmPassword(
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
                                                    <label
                                                        htmlFor="inputNoHp"
                                                        className="form-label"
                                                    >
                                                        Nomor HP
                                                    </label>
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputNoHp"
                                                        placeholder="Contoh: 081234567890"
                                                        value={noHp}
                                                        onChange={(e) =>
                                                            setNoHp(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputNamaKantor"
                                                        className="form-label"
                                                    >
                                                        Nama Kantor
                                                    </label>
                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputNamaKantor"
                                                        placeholder="Contoh: Reezky Inc."
                                                        value={namaKantor}
                                                        onChange={(e) =>
                                                            setNamaKantor(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputAlamat"
                                                        className="form-label"
                                                    >
                                                        Alamat Kantor
                                                    </label>

                                                    <small className="text-danger ms-2">
                                                        *Wajib diisi
                                                    </small>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputAlamat"
                                                        placeholder="Contoh: Jl. Mawar No. 123"
                                                        value={alamat}
                                                        onChange={(e) =>
                                                            setAlamat(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="inputFotoProfile"
                                                        className="form-label"
                                                    >
                                                        Foto Profile
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="inputFotoProfile"
                                                        onChange={(e) =>
                                                            setFotoProfile(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="termsCheck"
                                                            required
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="termsCheck"
                                                        >
                                                            Saya menyetujui
                                                            syarat dan ketentuan
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
                                                                "Daftar"
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="text-center">
                                                        <p className="mb-0">
                                                            Sudah punya akun?{" "}
                                                            <Link to="/customers/login">
                                                                Masuk di sini
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

export default Register;
