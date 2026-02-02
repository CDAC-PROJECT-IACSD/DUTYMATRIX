import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function LeaveRequest() {
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    lStartDate: "",
    lEndDate: "",
    lReason: "",
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

      setSuccess("Leave request submitted successfully");

      setFormData({
        lStartDate: "",
        lEndDate: "",
        lReason: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || "Failed to submit leave request"
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

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Apply for Leave
            </div>

            <div className="card-body">
              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="lStartDate"
                    value={formData.lStartDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="lEndDate"
                    value={formData.lEndDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="lReason"
                    value={formData.lReason}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Apply Leave"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
