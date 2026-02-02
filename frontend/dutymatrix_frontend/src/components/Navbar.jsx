import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const isOfficer = user?.role === "POLICE_OFFICER";
  const isStationIncharge = user?.role === "STATION_INCHARGE";
  const isCommissioner = user?.role === "COMMISSIONER";

  const getDashboardName = () => {
    switch (user?.role) {
      case "POLICE_OFFICER":
        return "Police Officer Dashboard";
      case "STATION_INCHARGE":
        return "Station Incharge Dashboard";
      case "COMMISSIONER":
        return "Commissioner Dashboard";
      default:
        return "";
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">DutyMatrix</span>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="ms-auto d-flex flex-column flex-md-row align-items-md-center gap-2 mt-3 mt-md-0">

          {/* Officer Links */}
          {isOfficer && (
            <>
             {/* extra features in future add in nav bar */}
            </>
          )}

          {/* Station Incharge Links */}
          {isStationIncharge && (
            <>
            {/* if any thing extra we want to add then we can add it here.... */}
            </>
          )}

          {/* Dashboard Name */}
          <span className="text-light small text-center">
            {getDashboardName()}
          </span>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
