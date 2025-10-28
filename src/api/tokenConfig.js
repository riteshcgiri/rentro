// src/api/axiosConfig.js
import axios from "axios";

const tokenConfig = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL || "http://localhost:3000/api",
  withCredentials: false, // Only needed if you deal with cookies
});

tokenConfig.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("rentroToken"));

  // Only set JSON Content-Type if data is NOT FormData
  const isFormData = config.data instanceof FormData;

  config.headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(isFormData ? {"Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
  };

  return config;
});

export default tokenConfig;
