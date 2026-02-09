import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:9090",
});

export const sendOtp = (email) =>
  API.post(`/auth/send-otp?email=${email}`);

export const verifyOtp = (data) =>
  API.post("/auth/verify-otp", data);
