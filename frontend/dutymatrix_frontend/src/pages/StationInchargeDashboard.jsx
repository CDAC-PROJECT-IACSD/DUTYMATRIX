import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import CreateShift from "./CreateShift";
import "../styles/dashboard.css";

export default function StationInchargeDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Shift UI
  const [showCreateShift, setShowCreateShift] = useState(false);

  // FIR Dashboard State
  const [firs, setFirs] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FIR Assignment
  const [assigningId, setAssigningId] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState("");

  useEffect(() => {
    if (user?.station?.sid) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const stationId = user.station.sid;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [firsRes, officersRes] = await Promise.all([
        axios.get(`http://localhost:8080/fir/station/${stationId}`, config),
        axios.get(`http://localhost:8080/users/station/${stationId}`, config),
      ]);

      setFirs(firsRes.data);
      setOfficers(officersRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load station dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (firId) => {
    if (!selectedOfficer) return;

    try {
      await axios.put(
        `http://localhost:8080/fir/${firId}/assign`,
        null,
        {
          params: { officerId: selectedOfficer },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchDashboardData();
      setAssigningId(null);
      setSelectedOfficer("");
    } catch (err) {
      console.error(err);
      alert("Failed to assign officer");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Station Incharge Dashboard</h3>
      <p className="text-muted">
        Welcome, {user?.userName} | {user?.station?.sname}
      </p>

      {/* 🔘 ACTION BUTTONS */}
      <div className="my-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowCreateShift(!showCreateShift)}
        >
          {showCreateShift ? "Close Create Shift" : "Create Shift"}
        </button>

        {/* ✅ Swap Approval Button */}
        <button
          className="btn btn-warning"
          onClick={() => navigate("/swap-approval")}
        >
          Swap Approvals
        </button>
      </div>

      {/* CREATE SHIFT */}
      {showCreateShift && (
        <div className="card p-3 mt-3 mb-4">
          <CreateShift />
        </div>
      )}

      {/* FIR DASHBOARD */}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" />
          <p>Loading station data...</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <strong>Station FIR Registry</strong>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={fetchDashboardData}
            >
              Refresh
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>FIR ID</th>
                  <th>Status</th>
                  <th>Filed By</th>
                  <th>Investigating Officer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {firs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No FIRs found
                    </td>
                  </tr>
                ) : (
                  firs.map((fir) => (
                    <tr key={fir.firId}>
                      <td>#{fir.firId}</td>
                      <td>
                        <span className="badge bg-warning">
                          {fir.status}
                        </span>
                      </td>
                      <td>{fir.filedBy}</td>
                      <td>
                        {fir.investigatingOfficer === "Not Assigned" ? (
                          <span className="text-danger">Unassigned</span>
                        ) : (
                          <span className="text-success">
                            {fir.investigatingOfficer}
                          </span>
                        )}
                      </td>
                      <td>
                        {fir.investigatingOfficer === "Not Assigned" &&
                          (assigningId === fir.firId ? (
                            <div className="d-flex gap-2">
                              <select
                                className="form-select form-select-sm"
                                value={selectedOfficer}
                                onChange={(e) =>
                                  setSelectedOfficer(e.target.value)
                                }
                              >
                                <option value="">Select Officer</option>
                                {officers.map((off) => (
                                  <option
                                    key={off.userId}
                                    value={off.userId}
                                  >
                                    {off.name} ({off.rank})
                                  </option>
                                ))}
                              </select>

                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleAssign(fir.firId)}
                              >
                                ✓
                              </button>

                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => setAssigningId(null)}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => setAssigningId(fir.firId)}
                            >
                              Assign Officer
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
