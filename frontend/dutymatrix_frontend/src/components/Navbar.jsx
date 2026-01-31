import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
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

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
      {/* Brand */}
      <span className="navbar-brand fw-bold">DutyMatrix</span>

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
      </div>
    </nav>
  );
}
