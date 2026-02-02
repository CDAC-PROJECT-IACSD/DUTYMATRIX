import { useEffect, useState } from "react";
import axios from "axios";

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
        "http://localhost:9090/leave/pending/station",
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
        `http://localhost:9090/leave/approve/${leaveId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Leave approved");
      fetchPendingLeaves();
    } catch {
      setError("Failed to approve leave");
    }
  };

  // 🔹 REJECT
  const rejectLeave = async (leaveId) => {
    try {
      await axios.put(
        `http://localhost:9090/leave/reject/${leaveId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Leave rejected");
      fetchPendingLeaves();
    } catch {
      setError("Failed to reject leave");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Pending Leave Requests</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : leaves.length === 0 ? (
        <p>No pending leave requests</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Officer Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
                <td>{leave.userName}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approveLeave(leave.leaveId)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectLeave(leave.leaveId)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
