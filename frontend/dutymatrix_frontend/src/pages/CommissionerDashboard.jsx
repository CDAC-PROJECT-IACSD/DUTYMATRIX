import { useEffect, useState } from "react";
import {
  approveLeave,
  getAllStations,
  getDutiesByDate,
  getLeaveRequestsByStation,
  getAllSwapsForCommissioner,
  rejectLeave,
  getAllFirs,
} from "../services/api";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";
import { 
  Shield, 
  Users, 
  Map, 
  RefreshCcw, 
  FileText, 
  Calendar,
  Check,
  X,
  Search,
  Eye,
  AlertCircle
} from "lucide-react";

export default function CommissionerDashboard() {
  const { user } = useAuth();
  
  // ================= VIEW STATES =================
  const [activeTab, setActiveTab] = useState("OFFICERS"); // OFFICERS, DUTY, SWAP, LEAVE, FIR
  
  // ================= DATA STATES =================
  const [stations, setStations] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedRank, setSelectedRank] = useState("All");

  const [duties, setDuties] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loadingDuties, setLoadingDuties] = useState(false);

  const [swapRequests, setSwapRequests] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "OFFICERS") {
        const data = await getAllStations();
        setStations(data);
      } else if (activeTab === "SWAP") {
        const data = await getAllSwapsForCommissioner();
        setSwapRequests(data);
      } else if (activeTab === "LEAVE") {
        const data = await getLeaveRequestsByStation();
        setLeaveRequests(data);
      } else if (activeTab === "FIR") {
        const data = await getAllFirs();
        setFirs(data);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDuties = async () => {
    if (!selectedDate) return;
    setLoadingDuties(true);
    try {
      const data = await getDutiesByDate(selectedDate);
      setDuties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDuties(false);
    }
  };

  const handleLeaveAction = async (id, action) => {
    try {
      if (action === 'approve') await approveLeave(id);
      else await rejectLeave(id);
      const data = await getLeaveRequestsByStation();
      setLeaveRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Commissioner Dashboard</h3>
      <h5 className="welcome-message">
        HQ Oversight | Commissioner {user.userName}
      </h5>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="button-container">
        <button
          className={`dashboard-btn btn-primary ${activeTab === 'OFFICERS' ? 'active' : ''}`}
          onClick={() => setActiveTab('OFFICERS')}
        >
          <Users size={20} className="me-2" /> Station Personnel
        </button>

        <button
          className={`dashboard-btn btn-success ${activeTab === 'DUTY' ? 'active' : ''}`}
          onClick={() => setActiveTab('DUTY')}
        >
          <Map size={20} className="me-2" /> Duty Oversight
        </button>

        <button
          className={`dashboard-btn btn-warning ${activeTab === 'SWAP' ? 'active' : ''}`}
          onClick={() => setActiveTab('SWAP')}
        >
          <RefreshCcw size={20} className="me-2" /> Swap Requests
        </button>

        <button
          className={`dashboard-btn btn-danger ${activeTab === 'LEAVE' ? 'active' : ''}`}
          onClick={() => setActiveTab('LEAVE')}
        >
          <Calendar size={20} className="me-2" /> Leave Portal
        </button>

        <button
          className={`dashboard-btn btn-info ${activeTab === 'FIR' ? 'active' : ''}`}
          onClick={() => setActiveTab('FIR')}
        >
          <Shield size={20} className="me-2" /> Case Registry
        </button>
      </div>

      {/* ================= CONTENT MAPPING ================= */}
      <div className="content-area mt-4">
        
        {/* 1. STATION OFFICERS */}
        {activeTab === 'OFFICERS' && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <Users className="text-primary me-3" size={32} />
              <h3 className="leave-title mb-0">Personnel Deployment</h3>
            </div>

            <div className="row g-3 mb-4 bg-dark p-3 rounded shadow-sm border border-secondary">
              <div className="col-md-6">
                <label className="small text-muted text-uppercase fw-bold mb-1">Filter by Position</label>
                <select className="form-select form-select-sm bg-dark text-light border-secondary" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="All">All Roles</option>
                  <option value="POLICE_OFFICER">Police Officer</option>
                  <option value="STATION_INCHARGE">Station Incharge</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="small text-muted text-uppercase fw-bold mb-1">Filter by Rank</label>
                <select className="form-select form-select-sm bg-dark text-light border-secondary" value={selectedRank} onChange={(e) => setSelectedRank(e.target.value)}>
                  <option value="All">All Ranks</option>
                  <option value="CONSTABLE">Constable</option>
                  <option value="INSPECTOR">Inspector</option>
                  <option value="DSP">DSP</option>
                  <option value="SP">SP</option>
                  <option value="SENIOR_SP">Senior SP</option>
                </select>
              </div>
            </div>

            {stations.map((station) => (
              <div className="mb-5" key={station.stationId}>
                <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                  <h5 className="text-info mb-0 fw-bold">{station.stationName} <span className="text-muted fw-normal small">({station.location})</span></h5>
                  <span className="badge bg-secondary">{station.users.length} Personnel</span>
                </div>
                <div className="table-responsive">
                  <table className="table table-dark table-striped table-hover mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>UID</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {station.users
                        .filter(u => (selectedRole === "All" || u.role === selectedRole) && (selectedRank === "All" || u.rank === selectedRank))
                        .map(u => (
                          <tr key={u.userId}>
                            <td className="text-muted">#{u.userId}</td>
                            <td className="fw-bold">{u.name}</td>
                            <td><span className="badge bg-outline-info border border-info text-info">{u.role.replace('_', ' ')}</span></td>
                            <td>{u.rank}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. DUTY OVERSIGHT */}
        {activeTab === 'DUTY' && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <Map className="text-success me-3" size={32} />
              <h3 className="leave-title mb-0">Operational Duty Roster</h3>
            </div>

            <div className="row g-3 align-items-end mb-4 bg-dark p-3 rounded shadow-sm border border-secondary">
              <div className="col-md-5">
                <label className="small text-muted text-uppercase fw-bold mb-1">Select Inspection Date</label>
                <input type="date" className="form-control form-control-sm bg-dark text-light border-secondary" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className="col-md-3">
                <button className="btn btn-success btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={loadDuties}>
                  <Search size={16} /> Load Roster
                </button>
              </div>
            </div>

            {loadingDuties ? (
              <div className="text-center py-5"><div className="spinner-border text-success" /></div>
            ) : duties.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-striped table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Shift ID</th>
                      <th>Officer</th>
                      <th>Assignment</th>
                      <th>Window</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duties.map(d => (
                      <tr key={d.shiftId}>
                        <td>#{d.shiftId}</td>
                        <td className="fw-bold text-info">{d.officerName}</td>
                        <td>
                          <span className={`badge ${d.shiftType === "NIGHT_SHIFT" ? "bg-dark border border-secondary" : "bg-warning text-dark"}`}>
                            {d.shiftType.replace('_', ' ')}
                          </span>
                        </td>
                        <td><small className="text-light">{d.startTime} - {d.endTime}</small></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : selectedDate && <div className="text-center py-4 text-muted border border-secondary rounded border-dashed">No duty logs found for this date.</div>}
          </div>
        )}

        {/* 3. SWAP REQUESTS */}
        {activeTab === 'SWAP' && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <RefreshCcw className="text-warning me-3" size={32} />
              <h3 className="leave-title mb-0">Personnel Swap Logs</h3>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Swap ID</th>
                    <th>Requester</th>
                    <th>Target</th>
                    <th>Shift Type</th>
                    <th>Log Status</th>
                  </tr>
                </thead>
                <tbody>
                  {swapRequests.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4 text-muted">No swap logs found in registry.</td></tr>
                  ) : swapRequests.map(s => (
                    <tr key={s.swapId}>
                      <td className="text-muted">#{s.swapId}</td>
                      <td className="fw-bold">{s.requestingUser}</td>
                      <td>{s.targetUser}</td>
                      <td>{s.shiftType}</td>
                      <td>
                        <span className={`badge ${s.status === "PENDING" ? "bg-warning text-dark" : s.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. LEAVE PORTAL */}
        {activeTab === 'LEAVE' && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <Calendar className="text-danger me-3" size={32} />
              <h3 className="leave-title mb-0">Departmental Leave Review</h3>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Personnel</th>
                    <th>Duration</th>
                    <th>Justification</th>
                    <th>Status</th>
                    <th className="text-center">HQ Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4 text-muted">No pending leave requests.</td></tr>
                  ) : leaveRequests.map(l => (
                    <tr key={l.leaveId}>
                      <td className="text-muted">#{l.leaveId}</td>
                      <td>
                        <div className="fw-bold text-info">{l.userName}</div>
                        <div className="small text-muted">{l.userRole.replace('_', ' ')}</div>
                      </td>
                      <td>
                        <div className="small text-light">F: {l.startDate}</div>
                        <div className="small text-light">T: {l.endDate}</div>
                      </td>
                      <td style={{ maxWidth: '200px' }} className="text-truncate">{l.reason}</td>
                      <td>
                        <span className={`badge ${l.status === "PENDING" ? "bg-warning text-dark" : l.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {l.userRole === "STATION_INCHARGE" && l.status === "PENDING" ? (
                          <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-sm btn-success" onClick={() => handleLeaveAction(l.leaveId, 'approve')}><Check size={14} /></button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleLeaveAction(l.leaveId, 'reject')}><X size={14} /></button>
                          </div>
                        ) : <span className="small text-muted italic">ReadOnly</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. CASE REGISTRY */}
        {activeTab === 'FIR' && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <Shield className="text-info me-3" size={32} />
              <h3 className="leave-title mb-0">Central FIR Registry</h3>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>FIR ID</th>
                    <th>Status</th>
                    <th>Station File</th>
                    <th>I.O Name</th>
                    <th>Details</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {firs.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4 text-muted">No digital FIR logs found.</td></tr>
                  ) : firs.map(fir => (
                    <tr key={fir.firId}>
                      <td className="fw-bold">#{fir.firId}</td>
                      <td><span className={`badge ${fir.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-success'}`}>{fir.status}</span></td>
                      <td>
                        <div className="fw-bold text-info">{fir.filedBy}</div>
                      </td>
                      <td>
                        <div className="text-light small">{fir.investigatingOfficer}</div>
                      </td>
                      <td style={{ maxWidth: '250px' }}>
                        <div className="text-truncate small text-light">{fir.crimeDescription}</div>
                      </td>
                      <td className="small text-muted">{fir.crimeDateTime ? new Date(fir.crimeDateTime).toLocaleString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
