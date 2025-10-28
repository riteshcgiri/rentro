import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const verifyUser = async () => {
            const token = searchParams.get("token");
            const id = searchParams.get("id");
            const baseURL = import.meta.env.VITE_API_SERVER_URL;
            if (!token || !id) {
                setStatus("Invalid verification link.");
                return;
            }

            try {
                const res = await axios.get(`${baseURL}/verification?token=${token}&id=${id}`);
                setStatus(res.data.message);
            } catch (err) {
                setStatus(err.response?.data?.message || "Verification failed.");
            }
        };

        verifyUser();
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-blue-600">Rentro</h1>
                <p className="mt-4 text-lg">{status}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
