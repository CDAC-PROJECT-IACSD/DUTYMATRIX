import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leave_approval.css";
import { Check, X, ClipboardList } from "lucide-react";

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 FETCH PENDING LEAVES
  const fetchPendingLeaves = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/leave/pending/station`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  // 🔹 APPROVE
  const approveLeave = async (leaveId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/leave/approve/${leaveId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Leave request approved successfully! ✅");
      setTimeout(() => setMessage(""), 3000);
      fetchPendingLeaves();
    } catch {
      setError("Failed to approve leave");
    }
  };

  // 🔹 REJECT
  const rejectLeave = async (leaveId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/leave/reject/${leaveId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Leave request rejected. ❌");
      setTimeout(() => setMessage(""), 3000);
      fetchPendingLeaves();
    } catch {
      setError("Failed to reject leave");
    }
  };

  return (
    <div className="leave-approval-container">
      <div className="d-flex align-items-center mb-4">
        <ClipboardList className="text-warning me-3" size={32} />
        <h3 className="leave-title mb-0">Personnel Leave Registry</h3>
      </div>

      {message && <div className="alert alert-success py-2 text-center mb-3">{message}</div>}
      {error && <div className="alert alert-danger py-2 text-center mb-3">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="mt-2 text-gray">Retrieving records...</p>
        </div>
      ) : leaves.length === 0 ? (
        <div className="empty-state">
           <p>All clear! No pending leave requests found for this station.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Officer</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.leaveId} className="align-middle">
                  <td>#{leave.leaveId}</td>
                  <td>
                    <div className="fw-bold text-info">{leave.userName}</div>
                    <div className="small text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Personnel Record</div>
                  </td>
                  <td>
                    <div className="small text-light">From: {leave.startDate}</div>
                    <div className="small text-light">To: {leave.endDate}</div>
                  </td>
                  <td style={{ maxWidth: '200px' }} className="text-truncate">
                    {leave.reason}
                  </td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-success d-flex align-items-center gap-1"
                        onClick={() => approveLeave(leave.leaveId)}
                        title="Approve Leave"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                        onClick={() => rejectLeave(leave.leaveId)}
                        title="Reject Leave"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
