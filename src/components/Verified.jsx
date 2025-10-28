import React, { useState, useEffect } from "react";
import { ShieldAlert, ShieldCheck, X, CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/slices/notificationSlice";
import { useLocation } from "react-router-dom";
import SpinnerLoader from "./Loaders/SpinnerLoader";

const Verified = ({ user, isEditable, activeSection }) => {
    const [showAlert, setShowAlert] = useState(true);
    const [isVerified, setIsVerified] = useState(user?.isVerified || false);
    const [isLoading, setIsLoading] = useState(false);
    const [linkSent, setLinkSent] = useState(false); // ✅ new state
    const [countdown, setCountdown] = useState(0);
    const dispatch = useDispatch();
    const location = useLocation();

    // 🔹 Check if user landed with verification link
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const id = params.get("id");

        if (location.pathname === "/verify-email" && token && id) {
            const baseURL = import.meta.env.VITE_API_SERVER_URL;

            axios
                .get(`${baseURL}/verification?token=${token}&id=${id}`)
                .then((res) => {
                    setIsVerified(true);
                    setShowAlert(true);
                    setCountdown(10);
                    dispatch(addNotification({ message: res.data.message || "Account verified successfully!", type: "success" }));

                    const interval = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) {
                                clearInterval(interval);
                                setShowAlert(false);
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);

                    return () => clearInterval(interval);
                    location.pathname = "/profile"; // ✅ remove query params
                })
                .catch((err) => {
                    dispatch(addNotification({ message: err.response?.data?.message || "Verification link is invalid/expired", type: "error" }));
                });
        }
    }, [location, dispatch]);

    // 🔹 Send verification link again
    const sendVerficationLink = async () => {
        const userId = JSON.parse(localStorage.getItem("rentroUserId"));
        const baseURL = import.meta.env.VITE_API_SERVER_URL;

        try {
            setIsLoading(true);
            const res = await axios.post(`${baseURL}/verification/send`, {
                userId: userId,
            });
            if (res.status === 200) {
                setLinkSent(true); // ✅ hide button
                dispatch(
                    addNotification({
                        message: "Link Sent, please check your email",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    addNotification({
                        message:
                            "Failed to send verification link, please try again later",
                        type: "error",
                    })
                );
            }
        } catch (err) {
            console.error("❌ Axios error:", err.message);
            dispatch(addNotification({ message: err.message, type: "error" }));
        } finally {
            setIsLoading(false);
        }
    };

    if (!showAlert) return null;

    return isVerified ? (
        <div
            className={`w-full bg-green-100 border-l-4 border-green-500 text-green-700 p-5 mb-5 rounded-lg flex items-center justify-between transition-all duration-500 ${isEditable || activeSection  ? "hidden" : ""
                }`}
        >
            <p className="text-sm font-medium flex items-center">
                <ShieldCheck strokeWidth={1.5} className="w-6 h-6 mr-2" />
                Your account is
                <span className="font-semibold ml-1">Successfully Verified</span>
                <span className="ml-3 text-xs text-green-600">
                    (Closing in {countdown}s)
                </span>
            </p>
            <button
                className="p-2 rounded-full hover:bg-green-300/30"
                onClick={() => setShowAlert(false)}
            >
                <X className="w-6 h-6" />
            </button>
        </div>
    ) : (
        <div
            className={`w-full bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-5 mb-5 rounded-lg flex items-center justify-between transition-all duration-500 ${isEditable || activeSection ? "hidden" : ""
                }`}
        >
            <p className="text-sm font-medium flex items-center">
                <ShieldAlert strokeWidth={1.5} className="w-6 h-6 mr-2" /> Your
                account is not verified. Please verify your account to access all
                features.
            </p>

            {linkSent ? (
                <span className="ml-4 text-xs font-semibold text-green-600 bg-green-100 py-2 px-3 rounded-md flex items-center gap-2">
                    <CircleCheckBig className="w-4 h-4 inline-block mr-1" /> Link Sent Successfully
                </span>
            ) : (
                <button
                    className="ml-4 px-5 py-3 text-xs font-semibold rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
                    onClick={sendVerficationLink}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <SpinnerLoader
                            width={20}
                            height={20}
                            className={"fill-none stroke-amber-600"}
                        />
                    ) : (
                        "Verify Now"
                    )}
                </button>
            )}
        </div>
    );
};

export default Verified;
