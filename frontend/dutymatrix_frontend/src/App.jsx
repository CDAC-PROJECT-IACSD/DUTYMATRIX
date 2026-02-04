
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
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtpReset />} />

        {/* POLICE OFFICER */}
        <Route
          path="/dashboard/officer"
          element={
            <ProtectedRoute allowedRoles={["POLICE_OFFICER"]}>
              <PoliceOfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* STATION INCHARGE */}
        <Route
          path="/dashboard/stationIncharge"
          element={
            <ProtectedRoute allowedRoles={["STATION_INCHARGE"]}>
              <StationInchargeDashboard />
            </ProtectedRoute>
          }
        />

        {/* COMMISSIONER */}
        <Route
          path="/dashboard/commissioner"
          element={
            <ProtectedRoute allowedRoles={["COMMISSIONER"]}>
              <CommissionerDashboard />
            </ProtectedRoute>
          }
        />

        {/* SHARED / ROLE BASED */}
        <Route
          path="/leave"
          element={
            <ProtectedRoute
              allowedRoles={["POLICE_OFFICER", "STATION_INCHARGE"]}
            >
              <LeaveRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shift-swap"
          element={
            <ProtectedRoute allowedRoles={["POLICE_OFFICER"]}>
              <ShiftSwap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={[
                "POLICE_OFFICER",
                "STATION_INCHARGE",
                "COMMISSIONER",
              ]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
