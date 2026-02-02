import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function LeaveRequest() {
  const { user, token } = useAuth();

  const [form, setForm] = useState({
    lStartDate: "",
    lEndDate: "",
    lReason: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ REQUIRED FUNCTION (your error was here earlier)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://localhost:9090/leave/apply", // matches controller
        {
          lStartDate: formData.lStartDate,
          lEndDate: formData.lEndDate,
          lReason: formData.lReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // REQUIRED
            "Content-Type": "application/json",
          },
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

      // ✅ SAFE ERROR RENDERING
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to submit leave request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Leave Request</h3>
      <h5 className="welcome-message">
        Welcome {user?.userName}
      </h5>

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
