import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function MerchantsProfile() {
    const [merchant, setMerchant] = useState({});
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        company_name: "",
        email: "",
        contact: "",
        address: "",
        description: "",
    });

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/merchants/profile"
                );
                setMerchant(response.data);
                setFormData({
                    company_name: response.data.company_name,
                    email: response.data.email,
                    contact: response.data.contact,
                    address: response.data.address,
                    description: response.data.description,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchMerchantData();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/merchants/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${merchant.token}`,
                        },
                    }
                );
                setOrders(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (merchant.token) {
            fetchOrders();
        }
    }, [merchant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        axios
            .put("http://localhost:8000/api/merchants/profile", formData)
            .then((response) => {
                alert("Profile updated successfully!");
                setMerchant(response.data);
            })
            .catch((error) => console.log(error));
    };

    const columns = [
        {
            name: "Order ID",
            selector: (row) => row.order_id,
            sortable: true,
        },
        {
            name: "Customer ID",
            selector: (row) => row.customer_id,
            sortable: true,
        },
        {
            name: "Total",
            selector: (row) => row.total,
            sortable: true,
        },
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
                                    <h4>{merchant.company_name}</h4>
                                    <p className="text-secondary mb-1">
                                        Merchant
                                    </p>
                                    <p className="text-muted font-size-sm">
                                        {merchant.address}
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
                                    <h6 className="mb-0">Company Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company_name"
                                        value={formData.company_name}
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
                                    <h6 className="mb-0">Phone</h6>
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
                                    <h6 className="mb-0">Address</h6>
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
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
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
                                        Save Changes
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
                                        Orders
                                    </h5>
                                    <DataTable
                                        columns={columns}
                                        data={orders}
                                        pagination
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MerchantsProfile;
