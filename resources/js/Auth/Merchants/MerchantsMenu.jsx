import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function MerchantsMenu() {
    const [menus, setMenus] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        photo: null,
    });

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/merchants/menus"
                );
                setMenus(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchMenus();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSave = async () => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("photo", formData.photo);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/merchants/menu",
                data
            );

            setMenus([...menus, response.data]);
            setFormData({
                name: "",
                description: "",
                price: "",
                photo: null,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/merchants/menu/${id}`
            );
            setMenus(menus.filter((menu) => menu.id !== id));
        } catch (error) {
            console.log(error.message);
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Photo",
            selector: (row) => (
                <img
                    src={`http://localhost:8000/storage/${row.photo}`}
                    alt={row.name}
                    width={50}
                />
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(row.id)}
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="d-flex align-items-center mb-3">
                                Manage Menu
                            </h5>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Menu Name</h6>
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
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Price</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Photo</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="photo"
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
                                        Add Menu
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
                                        Menu List
                                    </h5>
                                    <DataTable
                                        columns={columns}
                                        data={menus}
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

export default MerchantsMenu;
