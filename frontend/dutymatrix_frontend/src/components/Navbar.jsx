import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const getDashboardName = () => {
    switch (user.role) {
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
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">DutyMatrix</span>

      <div className="d-flex align-items-center gap-3">
        <span className="text-light">{getDashboardName()}</span>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
