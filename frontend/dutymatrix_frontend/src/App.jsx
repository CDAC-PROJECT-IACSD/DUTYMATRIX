import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Login from "./pages/Login";
import PoliceOfficerDashboard from "./pages/PoliceOfficerDashboard";
import StationInchargeDashboard from "./pages/StationInchargeDashboard";
import CommissionerDashboard from "./pages/CommissionerDashboard";
import ShiftSwap from "./pages/SwapShift";

import LeaveRequest from "./pages/LeaveRequest";
import CreateShift from "./pages/CreateShift";
import SwapApproval from "./pages/SwapApproval";

// 🔹 OTP Reset Pages
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtpReset from "./pages/VerifyOtpReset";

import Navbar from "./components/Navbar";

import Notifications from "./components/Notifications";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtpReset />} />

        {/* DASHBOARDS */}
        <Route path="/dashboard/officer" element={<PoliceOfficerDashboard />} />
        <Route
          path="/dashboard/stationIncharge"
          element={<StationInchargeDashboard />}
        />
        <Route
          path="/dashboard/commissioner"
          element={<CommissionerDashboard />}
        />

        {/* POLICE OFFICER */}
        <Route path="/leave" element={<LeaveRequest />} />
        <Route path="/shift-swap" element={<ShiftSwap />} />

        {/* STATION INCHARGE */}
        <Route path="/shifts" element={<CreateShift />} />
        <Route path="/swap-approval" element={<SwapApproval />} />

        {/* Notification */}
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </>
  );
}

export default App;
