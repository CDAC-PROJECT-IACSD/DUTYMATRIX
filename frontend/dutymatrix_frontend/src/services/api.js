import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------- AUTH APIs ----------------

// Login API
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Invalid Email or Password",
    );
  }
};

// ---------------- COMMISSIONER APIs ----------------

// Fetch all stations with users
export const getAllStations = async () => {
  try {
    const response = await API.get("/commissioner/stations");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stations " + error.message);
  }
};

export const getDutiesByDate = async (date) => {
  const res = await API.get(`/commissioner/duties`, {
    params: { date },
  });
  return res.data;
};

export const getSwapRequestsByStation = async () => {
  const res = await API.get("/swaps/pending"); // station-scoped via JWT
  return res.data;
};

export const getLeaveRequestsByStation = async () => {
  const res = await API.get("/leave/pending");
  return res.data;
};

export const approveLeave = async (leaveId) => {
  await API.put(`/leave/approve/${leaveId}`);
};

export const rejectLeave = async (leaveId) => {
  await API.put(`/leave/reject/${leaveId}`);
};

export default API;
