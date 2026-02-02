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

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard/officer" element={<PoliceOfficerDashboard />} />
        <Route
          path="/dashboard/stationIncharge"
          element={<StationInchargeDashboard />}
        />
        <Route
          path="/dashboard/commissioner"
          element={<CommissionerDashboard />}
        />

        {/* Police Officer */}
        <Route path="/leave" element={<LeaveRequest />} />
        <Route path="/shift-swap" element={<ShiftSwap />} />

        {/* Station Incharge */}
        <Route path="/shifts" element={<CreateShift />} />
        <Route path="/swap-approval" element={<SwapApproval />} />
      </Routes>
    </>
  );
}

export default App;
