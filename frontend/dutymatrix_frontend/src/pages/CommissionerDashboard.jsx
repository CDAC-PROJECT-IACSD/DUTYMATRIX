import { useEffect, useState } from "react";
import {
  approveLeave,
  getAllStations,
  getDutiesByDate,
  getLeaveRequestsByStation,
  getAllSwapsForCommissioner,
  rejectLeave,
} from "../services/api";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function CommissionerDashboard() {
  const { user } = useAuth();
  const [stations, setStations] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedRank, setSelectedRank] = useState("All");

  //Duty Fetching
  const [duties, setDuties] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDuties, setShowDuties] = useState(false);
  const [showDutyOversight, setShowDutyOversight] = useState(false);

  //Swap Request
  const [swapRequests, setSwapRequests] = useState([]);
  const [showSwapRequests, setShowSwapRequests] = useState(false);

  //Leave Requests
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveRequests, setShowLeaveRequests] = useState(false);

  useEffect(() => {
    if (showTable) {
      getAllStations().then(setStations).catch(console.error);
    }
  }, [showTable]);

  useEffect(() => {
    if (showSwapRequests) {
      getAllSwapsForCommissioner().then(setSwapRequests).catch(console.error);
    }
  }, [showSwapRequests]);

  useEffect(() => {
    if (showLeaveRequests) {
      getLeaveRequestsByStation().then(setLeaveRequests).catch(console.error);
    }
  }, [showLeaveRequests]);

  const loadDuties = () => {
    if (!selectedDate) return;
    getDutiesByDate(selectedDate).then(setDuties).catch(console.error);
    setShowDuties(true);
  };

  const resetViews = () => {
    setShowTable(false);
    setShowDutyOversight(false);
    setShowSwapRequests(false);
    setShowLeaveRequests(false);
  };

  const refreshLeaves = () => {
    getLeaveRequestsByStation().then(setLeaveRequests).catch(console.error);
  };

  const loadSwap = () => {
    // Implement swap request loading logic here
    getAllSwapsForCommissioner().then(setSwapRequests).catch(console.error);
  };

  return (
    <>
      <div className="dashboard-container">
        <h3 className="dashboard-title">Commissioner Dashboard</h3>
        <h5 className="welcome-message">Welcome {user.userName}</h5>

        <div className="button-container">
          {/* ================= OFFICERS ================= */}
          <button
            className="dashboard-btn btn-primary"
            onClick={() => {
              resetViews();
              setShowTable(true);
            }}
          >
            <img
              src="/src/assets/checkok.gif"
              alt="Icon"
              className="btn-icon"
            />
            {showTable ? "Hide Officers" : "View Station Officers"}
          </button>

          {/* ================= DUTY OVERSIGHT ================= */}
          <button
            className="dashboard-btn btn-success"
            onClick={() => {
              resetViews();
              setShowDutyOversight(true);
            }}
          >
            <img
              src="/src/assets/checkok.gif"
              alt="Icon"
              className="btn-icon"
            />
            {showDutyOversight ? "Hide Duty Oversight" : "View Duty Oversight"}
          </button>

          {/* ======================= Swap Request Show Button ================= */}

          <button
            className="dashboard-btn btn-warning"
            onClick={() => {
              resetViews();
              setShowSwapRequests(true);
            }}
          >
            <img
              src="/src/assets/checkok.gif"
              alt="Icon"
              className="btn-icon"
            />
            {showSwapRequests ? "Hide Swap Requests" : "View Swap Requests"}
          </button>

          {/* ======================= Leave Request Show Button ================= */}
          <button
            className="dashboard-btn btn-danger"
            onClick={() => {
              resetViews();
              setShowLeaveRequests(true);
            }}
          >
            <img
              src="/src/assets/checkok.gif"
              alt="Icon"
              className="btn-icon"
            />
            {showLeaveRequests ? "Hide Leave Requests" : "View Leave Requests"}
          </button>
        </div>

        {/* ==================Content Area==================== */}
        <div className="content-area mt-4">
          {showTable && (
            <>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Filter by Role
                  </label>
                  <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="POLICE_OFFICER">Police Officer</option>
                    <option value="STATION_INCHARGE">Station Incharge</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Filter by Rank
                  </label>
                  <select
                    className="form-select"
                    value={selectedRank}
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="CONSTABLE">Constable</option>
                    <option value="INSPECTOR">Inspector</option>
                    <option value="DSP">DSP</option>
                    <option value="SP">SP</option>
                    <option value="SENIOR_SP">Senior SP</option>
                  </select>
                </div>
              </div>

              {stations.map((station) => (
                <div className="card mt-4" key={station.stationId}>
                  <div className="card-header fw-bold">
                    {station.stationName} — {station.location}
                  </div>

                  <table className="table table-bordered table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {station.users
                        .filter(
                          (u) =>
                            (selectedRole === "All" ||
                              u.role === selectedRole) &&
                            (selectedRank === "All" || u.rank === selectedRank),
                        )
                        .map((u) => (
                          <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.name}</td>
                            <td>{u.role}</td>
                            <td>{u.rank}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          )}

          {showDutyOversight && (
            <>
              <hr className="my-5" />
              <h4 className="fw-bold">Duty Oversight</h4>

              <div className="row g-3 align-items-end mt-2">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={loadDuties}
                  >
                    View Duty Roster
                  </button>
                </div>
              </div>

              {showDuties && (
                <div className="card mt-4">
                  <div className="card-header fw-bold">
                    Duty Roster — {selectedDate}
                  </div>

                  <table className="table table-bordered table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Shift ID</th>
                        <th>Officer</th>
                        <th>Shift</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {duties.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No duties found
                          </td>
                        </tr>
                      )}

                      {duties.map((d) => (
                        <tr key={d.shiftId}>
                          <td>{d.shiftId}</td>
                          <td>{d.officerName}</td>
                          <td>
                            <span
                              className={`badge ${
                                d.shiftType === "NIGHT_SHIFT"
                                  ? "bg-dark"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {d.shiftType}
                            </span>
                          </td>
                          <td>{d.startTime}</td>
                          <td>{d.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Swap Requests Section */}
          {showSwapRequests && (
            <>
              <hr className="my-5" />
              <h4 className="fw-bold">Swap Requests</h4>

              <div className="card mt-3">
                <table className="table table-bordered table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Swap ID</th>
                      <th>Requesting Officer</th>
                      <th>Target Officer</th>
                      <th>Shift</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {swapRequests.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No swap requests found
                        </td>
                      </tr>
                    )}

                    {swapRequests.map((s) => (
                      <tr key={s.swapId}>
                        <td>{s.swapId}</td>
                        <td>{s.requestingUser}</td>
                        <td>{s.targetUser}</td>
                        <td>{s.shiftType}</td>
                        <td>
                          <span
                            className={`badge ${
                              s.status === "PENDING"
                                ? "bg-warning text-dark"
                                : s.status === "APPROVED"
                                  ? "bg-success"
                                  : "bg-danger"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Leave Requests Section */}
          {showLeaveRequests && (
            <>
              <hr className="my-5" />
              <h4 className="fw-bold">Leave Requests</h4>

              <div className="card mt-3">
                <table className="table table-bordered table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaveRequests.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No leave requests found
                        </td>
                      </tr>
                    ) : (
                      leaveRequests.map((l) => (
                        <tr key={l.leaveId}>
                          <td>{l.leaveId}</td>
                          <td>{l.userName}</td>
                          <td>{l.userRole}</td>
                          <td>{l.startDate}</td>
                          <td>{l.endDate}</td>
                          <td>{l.reason}</td>
                          <td>
                            <span
                              className={`badge ${
                                l.status === "PENDING"
                                  ? "bg-warning text-dark"
                                  : l.status === "APPROVED"
                                    ? "bg-success"
                                    : "bg-danger"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td>
                            {l.userRole === "STATION_INCHARGE" &&
                            l.status === "PENDING" ? (
                              <>
                                <button
                                  className="btn btn-sm btn-success me-2"
                                  onClick={() =>
                                    approveLeave(l.leaveId).then(refreshLeaves)
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    rejectLeave(l.leaveId).then(refreshLeaves)
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-muted">View Only</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
