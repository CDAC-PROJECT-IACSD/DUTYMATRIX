import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

export default function LeaveRequest() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:9090/leave/apply",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setMessage(res.data);
      setForm({
        startDate: "",
        endDate: "",
        reason: ""
      });

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to submit leave request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Apply Leave</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="reason"
            className="form-control"
            rows="3"
            value={form.reason}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Leave Request"}
        </button>

        {message && (
          <p className="text-success mt-3">{message}</p>
        )}

        {error && (
          <p className="text-danger mt-3">{error}</p>
        )}

      </form>
    </div>
  );
}
