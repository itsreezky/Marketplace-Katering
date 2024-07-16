import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

// Membuat context untuk pengelolaan data
const DataContext = createContext();

// Hook untuk menggunakan DataContext
export const useData = () => {
    return useContext(DataContext);
};

// Penyedia DataContext
export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [merchantDetails, setMerchantDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [invoices, setInvoices] = useState([]);

    // Fungsi untuk mendapatkan data merchant details
    const fetchMerchantDetails = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/merchant-details`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setMerchantDetails(response.data);
        } catch (error) {
            console.error("Failed to fetch merchant details:", error);
        }
    };

    // Fungsi untuk mendapatkan data orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/order-details`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    // Fungsi untuk mendapatkan data menus
    const fetchMenus = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/menu`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setMenus(response.data);
        } catch (error) {
            console.error("Failed to fetch menus:", error);
        }
    };

    // Fungsi untuk mendapatkan data invoices berdasarkan role user
    const fetchInvoices = async () => {
        try {
            let response;
            if (user.role === "Customer") {
                response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/invoices/customer/${
                        user.id
                    }`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            } else if (user.role === "Merchant") {
                response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/invoices/merchant/${
                        user.id
                    }`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            }
            setInvoices(response.data);
        } catch (error) {
            console.error("Failed to fetch invoices:", error);
        }
    };

    // Mendapatkan data berdasarkan peran pengguna
    useEffect(() => {
        if (user) {
            if (user.role === "Customer") {
                fetchOrders();
                fetchInvoices();
            } else if (user.role === "Merchant") {
                fetchMerchantDetails();
                fetchMenus();
                fetchOrders();
                fetchInvoices();
            }
        }
    }, [user]);

    const value = {
        merchantDetails,
        orders,
        menus,
        invoices,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
