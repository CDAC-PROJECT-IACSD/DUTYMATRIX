import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import CreateShift from "./CreateShift";
import SwapApprovalManual from "./SwapApproval";
import LeaveApproval from "./LeaveApproval";
import "../styles/dashboard.css";

export default function StationInchargeDashboard() {
  const { user, token } = useAuth();

  // View State
  const [showCreateShift, setShowCreateShift] = useState(false);
  const [showSwapApprovals, setShowSwapApprovals] = useState(false);
  const [showFIRs, setShowFIRs] = useState(false);
  const [showLeaveApprovals, setShowLeaveApprovals] = useState(false);

  // FIR Dashboard State
  const [firs, setFirs] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FIR Assignment
  const [assigningId, setAssigningId] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState("");

  useEffect(() => {
    if (showFIRs) {
      fetchDashboardData();
    }
  }, [showFIRs]);

  const resetViews = () => {
    setShowCreateShift(false);
    setShowSwapApprovals(false);
    setShowFIRs(false);
    setShowLeaveApprovals(false);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [firsRes, officersRes] = await Promise.all([
        axios.get("http://localhost:9090/fir/station-incharge", config),
        axios.get("http://localhost:9090/users/station-incharge/officers", config),
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
        `http://localhost:9090/fir/${firId}/assign`,
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
    <div className="dashboard-container">
      <h3 className="dashboard-title">Station Incharge Dashboard</h3>
      <h5 className="welcome-message">
        Welcome, {user?.userName} | {user?.stationName}
      </h5>

      {/* 🔘 ACTION BUTTONS */}
      <div className="button-container">
        <button
          className="dashboard-btn btn-primary"
          onClick={() => {
            resetViews();
            setShowCreateShift(true);
          }}
        >
          Create Shift
        </button>

        <button
          className="dashboard-btn btn-warning"
          onClick={() => {
            resetViews();
            setShowSwapApprovals(true);
          }}
        >
          Swap Approvals
        </button>

        <button
          className="dashboard-btn btn-info"
          onClick={() => {
            resetViews();
            setShowLeaveApprovals(true);
          }}
        >
          Leave Approvals
        </button>

        <button
          className="dashboard-btn btn-success"
          onClick={() => {
            resetViews();
            setShowFIRs(true);
          }}
        >
          View Station FIRs
        </button>
      </div>

      {/* ================== CONTENT AREA ================== */}
      <div className="content-area mt-4">
        {showCreateShift && (
          <div className="card p-3 mb-4">
            <CreateShift />
          </div>
        )}

        {showSwapApprovals && <SwapApprovalManual />}

        {showLeaveApprovals && <LeaveApproval />}

        {showFIRs && (
          <>
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
                                    onClick={() =>
                                      handleAssign(fir.firId)
                                    }
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
                                  onClick={() =>
                                    setAssigningId(fir.firId)
                                  }
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
          </>
        )}
      </div>
    </div>
  );
}
