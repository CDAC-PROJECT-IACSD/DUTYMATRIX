import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

export default function LeaveRequest() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    lStartDate: "",
    lEndDate: "",
    lReason: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

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
        lStartDate: "",
        lEndDate: "",
        lReason: ""
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || "Failed to submit leave request"
      );
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
            name="lStartDate"
            className="form-control"
            value={form.lStartDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="lEndDate"
            className="form-control"
            value={form.lEndDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="lReason"
            className="form-control"
            rows="3"
            value={form.lReason}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Leave Request
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
