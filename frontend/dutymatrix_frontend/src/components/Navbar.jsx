import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout, isOfficer, isStationIncharge } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">DutyMatrix</span>

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
      </div>
    </nav>
  );
}
