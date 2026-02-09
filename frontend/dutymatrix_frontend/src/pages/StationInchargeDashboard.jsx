import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import CreateShift from "./CreateShift";
import SwapApprovalManual from "./SwapApproval";
import LeaveApproval from "./LeaveApproval";
import "../styles/dashboard.css";
import ApplyLeave from "./LeaveRequest";
import { Shield } from "lucide-react";
import "../styles/leave_approval.css";
export default function StationInchargeDashboard() {
  const { user, token } = useAuth();

  // View State
  const [showCreateShift, setShowCreateShift] = useState(false);
  const [showSwapApprovals, setShowSwapApprovals] = useState(false);
  const [showFIRs, setShowFIRs] = useState(false);
  const [showLeaveApprovals, setShowLeaveApprovals] = useState(false);

  const [showApplyLeave, setShowApplyLeave] = useState(false);


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
    setShowApplyLeave(false);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [firsRes, officersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/fir/station-incharge`, config),
        axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/users/station-incharge/officers`, config),
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
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/fir/${firId}/assign`,
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
  className="dashboard-btn btn-danger"
  onClick={() => {
    resetViews();
    setShowApplyLeave(true);
  }}
>
  Apply Leave
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
          <CreateShift />
        )}

        {showApplyLeave && (
          <ApplyLeave />
        )}


        {showSwapApprovals && <SwapApprovalManual />}

        {showLeaveApprovals && <LeaveApproval />}

        {showFIRs && (
          <div className="leave-approval-container mt-4">
            <div className="d-flex align-items-center mb-4">
              <Shield className="text-warning me-3" size={32} />
              <h3 className="leave-title mb-0">Station FIR Registry</h3>
            </div>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status" />
                <p className="mt-2 text-gray">Retrieving records...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-striped table-hover mb-0">
                  <thead>
                    <tr>
                      <th>FIR ID</th>
                      <th>Status</th>
                      <th>Filed By</th>
                      <th>Investigating Officer</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {firs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No digital FIRs found in registry.
                        </td>
                      </tr>
                    ) : (
                      firs.map((fir) => (
                        <tr key={fir.firId} className="align-middle">
                          <td>#{fir.firId}</td>
                          <td>
                            <span className={`badge ${fir.status.toLowerCase() === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                              {fir.status}
                            </span>
                          </td>
                          <td>
                            <div className="fw-bold text-info">{fir.filedBy}</div>
                            <div className="small text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Personnel</div>
                          </td>
                          <td>
                            {fir.investigatingOfficer === "Not Assigned" ? (
                              <span className="text-danger fw-bold">Unassigned</span>
                            ) : (
                              <span className="text-success fw-bold">
                                {fir.investigatingOfficer}
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            {fir.investigatingOfficer === "Not Assigned" &&
                            (assigningId === fir.firId ? (
                              <div className="d-flex justify-content-center gap-2">
                                <select
                                  className="form-select form-select-sm"
                                  style={{ width: '150px', background: '#0f172a', color: '#fff', borderColor: '#334155' }}
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
                                  className="btn btn-sm btn-danger"
                                  onClick={() => setAssigningId(null)}
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-sm btn-info text-dark d-flex align-items-center gap-1 mx-auto"
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
