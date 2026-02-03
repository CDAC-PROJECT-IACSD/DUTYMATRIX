import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Bell } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

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
      <Link to="/" className="navbar-brand d-flex align-items-center fw-bold">
        <img
          src={logo}
          alt="DutyMatrix Logo"
          width="40"
          height="40"
          className="d-inline-block align-top me-2"
        />
        DutyMatrix
      </Link>

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
        {!isLoginPage && user && (
          <div className="ms-auto d-flex flex-column flex-md-row align-items-md-center gap-2 mt-3 mt-md-0">
            {/* Officer Links */}
            {isOfficer && <>{/* extra features in future add in nav bar */}</>}

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
            <Link
              to="/notifications"
              className="btn btn-dark position-relative me-3"
            >
              <Bell size={20} />
            </Link>

            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
