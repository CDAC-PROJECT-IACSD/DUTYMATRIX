import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
<<<<<<< HEAD
  const { user, logout, isOfficer, isStationIncharge } = useAuth();
=======
  const { user, logout } = useAuth();

  const getDashboardName = () => {
    switch (user?.role) {
      case "POLICE_OFFICER":
        return "Police Officer Dashboard";
      case "STATION_INCHARGE":
        return "Station Incharge Dashboard";
      case "COMMISSIONER":
        return "Commissioner Dashboard";
      default:
        return "Dashboard";
    }
  };
>>>>>>> 2364d764d27152b40d7d11aaa6f0f17529d583df

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
      {/* Brand */}
      <span className="navbar-brand fw-bold">DutyMatrix</span>

<<<<<<< HEAD
      <div className="d-flex align-items-center gap-3">
        {isOfficer && (
         <>
          <Link to="/leave" className="btn btn-outline-light btn-sm">
            Leave Request
          </Link>
           <Link to="/shift-swap" className="btn btn-outline-light btn-sm">
         Shift Swap
       </Link>
         </>
        )}

        {isStationIncharge && (
          <Link to="/shifts" className="btn btn-outline-light btn-sm">
            Create Shift
          </Link>
        )}

        <span className="text-light">{user?.role}</span>

        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
=======
      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="ms-auto d-flex flex-column flex-md-row align-items-md-center gap-2 mt-3 mt-md-0">
          <span className="text-light small text-center text-md-start">
            {getDashboardName()}
          </span>

          <button
            className="btn btn-outline-danger btn-sm w-100 w-md-auto"
            onClick={logout}
          >
            Logout
          </button>
        </div>
>>>>>>> 2364d764d27152b40d7d11aaa6f0f17529d583df
      </div>
    </nav>
  );
}
