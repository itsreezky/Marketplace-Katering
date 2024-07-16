import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Penyedia AuthContext
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Menyimpan data pengguna
    const [loading, setLoading] = useState(true); // Menyimpan status loading

    // Fungsi untuk login
    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                { email, password }
            );
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // Fungsi untuk logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // Fungsi untuk registrasi
    const register = async (userData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/register`,
                userData
            );
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    // Fungsi untuk mendapatkan data pengguna saat halaman dimuat
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/user-details`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const { user, details } = response.data;
                    setUser({ ...user, details });
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const value = {
        user,
        login,
        logout,
        register,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
