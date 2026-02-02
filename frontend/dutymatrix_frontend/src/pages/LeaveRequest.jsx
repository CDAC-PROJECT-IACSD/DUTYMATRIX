import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";
import { Calendar, AlignLeft, Send, FileText } from "lucide-react";

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
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      return;
    }

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api.post("/leave/apply", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("Leave application submitted successfully! ✅");
      setForm({
        startDate: "",
        endDate: "",
        reason: ""
      });

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to submit leave request ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="swap-award-container p-0 border-0 bg-transparent">
      <div className="d-flex align-items-center mb-4">
        <FileText className="text-primary me-3" size={32} />
        <div>
          <h3 className="leave-title mb-1">Apply for Leave</h3>
          <p className="text-muted small mb-0">Submit a formal leave request for departmental review</p>
        </div>
      </div>

      <div className="card-body p-0">
        {message && (
          <div className="alert alert-success py-2 text-center mb-4">
             {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2 text-center mb-4">
             {error}
          </div>
        )}

        <form 
          onSubmit={handleSubmit}
          className={`row g-4 text-light ${validated ? 'was-validated' : ''}`}
          noValidate
        >
          <div className="col-md-6 mt-0">
            <div className="swap-input-group">
              <label className="swap-label">Start Date</label>
              <div className="swap-field-wrapper">
                <Calendar className="text-muted me-2" size={18} />
                <input
                  type="date"
                  name="startDate"
                  className="swap-input"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-0">
            <div className="swap-input-group">
              <label className="swap-label">End Date</label>
              <div className="swap-field-wrapper">
                <Calendar className="text-muted me-2" size={18} />
                <input
                  type="date"
                  name="endDate"
                  className="swap-input"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="swap-input-group">
              <label className="swap-label">Reason for Leave</label>
              <div className="swap-field-wrapper align-items-start py-2">
                <AlignLeft className="text-muted me-2 mt-1" size={18} />
                <textarea
                  name="reason"
                  className="swap-input"
                  rows="4"
                  placeholder="Provide a detailed justification for your leave request..."
                  value={form.reason}
                  onChange={handleChange}
                  style={{ resize: 'none' }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-12 text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <><Send size={20} /> Submit Application</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
