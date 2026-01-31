import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function PoliceOfficerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h4 className="welcome-message">Welcome {user.userName}</h4>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate("/shifts")}>
          <h5>My Shifts</h5>
          <p>View assigned duty shifts</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/leave")}>
          <h5>Apply Leave</h5>
          <p>Request leave & check status</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/duties")}>
          <h5>My Duties</h5>
          <p>Assigned daily responsibilities</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/profile")}>
          <h5>My Profile</h5>
          <p>View personal information</p>
        </div>
      </div>
    </div>
  );
}
