import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import CreateShift from "./CreateShift";

export default function StationInchargeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCreateShift, setShowCreateShift] = useState(false);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Station Incharge Dashboard</h3>
      <p className="text-muted">Welcome, {user.userName}</p>

      {/* Action Buttons */}
      <div className="my-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowCreateShift(!showCreateShift)}
        >
          {showCreateShift ? "Close Create Shift" : "Create Shift"}
        </button>

        {/* ✅ SWAP APPROVAL BUTTON */}
        <button
          className="btn btn-warning"
          onClick={() => navigate("/swap-approval")}
        >
          Swap Approvals
        </button>
      </div>

      {/* Conditional Rendering */}
      {showCreateShift && (
        <div className="card p-3 mt-3">
          <CreateShift />
        </div>
      )}
    </div>
  );
}
