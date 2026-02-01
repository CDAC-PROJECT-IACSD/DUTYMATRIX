import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function PoliceOfficerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h4 className="welcome-message">Welcome {user.userName}</h4>

      {/* Buttons section */}
      <div className="d-flex gap-3 mt-4 flex-wrap">

        <Link to="/leave" className="btn btn-outline-primary btn-sm">
          Apply Leave
        </Link>

        {/* Shift Swap Button */}
        <Link to="/shift-swap" className="btn btn-outline-light btn-sm">
          Shift Swap
        </Link>

        <Link to="/my-shifts" className="btn btn-outline-success btn-sm">
          My Shifts
        </Link>

      </div>
    </div>
  );
}
