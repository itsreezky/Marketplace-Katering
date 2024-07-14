import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function CustomersProfile() {
    const [customer, setCustomer] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/customer/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCustomer(response.data);
                console.log(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    contact: response.data.contact,
                    address: response.data.address,
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            fetchCustomerData();
        }
    }, []);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/customer/invoices",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setInvoices(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (token) {
            fetchInvoices();
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");

        axios
            .put("http://localhost:8000/api/customers/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                alert("Profil berhasil diperbarui!");
                setCustomer(response.data);
            })
            .catch((error) => console.log(error));
    };

    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Order ID", selector: (row) => row.order_id, sortable: true },
        {
            name: "Merchant ID",
            selector: (row) => row.merchant_id,
            sortable: true,
        },
        { name: "Total", selector: (row) => row.total, sortable: true },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
        },
    ];

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
                                    className="rounded-circle p-1 bg-primary"
                                    width={110}
                                />
                                <div className="mt-3">
                                    <h4>{customer.name}</h4>
                                    <p className="text-secondary mb-1">
                                        Customer
                                    </p>
                                    <p className="text-muted font-size-sm">
                                        {customer.address}
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
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                <div className="col-sm-3" />
                                <div className="col-sm-9 text-secondary">
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={handleSave}
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="d-flex align-items-center mb-3">
                                        Faktur
                                    </h5>
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
