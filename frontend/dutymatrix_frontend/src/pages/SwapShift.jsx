import { useState } from "react";
import api from "../api/axios";
import "../styles/dashboard.css";
import { RefreshCcw, User, Calendar, MessageSquare, Send } from "lucide-react";

const SwapShift = () => {
  const [form, setForm] = useState({
    shiftId: "",
    targetUserId: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
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

    setLoading(true);
    setMessage("");

    try {
      await api.post("/swaps", {
        shiftId: Number(form.shiftId),
        targetUserId: Number(form.targetUserId),
        reason: form.reason,
      });

      setMessage("Swap request sent successfully ✅");
      setForm({ shiftId: "", targetUserId: "", reason: "" });
    } catch (err) {
      console.error(err.response?.data);
      setMessage(
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Swap request failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="swap-award-container p-0 border-0 bg-transparent">
      <div className="d-flex align-items-center mb-4">
        <RefreshCcw className="text-warning me-3" size={32} />
        <div>
          <h3 className="leave-title mb-1">Shift Exchange Request</h3>
          <p className="text-muted small mb-0">Initiate a manual duty swap by providing IDs</p>
        </div>
      </div>

      <div className="card-body p-0">
        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} py-2 text-center mb-4`}>
            {message}
          </div>
        )}

        <form 
          onSubmit={handleSubmit} 
          className={`row g-4 text-light ${validated ? 'was-validated' : ''}`}
          noValidate
        >
          <div className="col-md-6 mt-0">
            <div className="swap-input-group">
              <label className="swap-label">Your Assigned Shift ID</label>
              <div className="swap-field-wrapper">
                <Calendar size={18} className="text-muted me-2" />
                <input
                  type="number"
                  name="shiftId"
                  className="swap-input"
                  placeholder="Enter Shift ID"
                  value={form.shiftId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-0">
            <div className="swap-input-group">
              <label className="swap-label">Target Officer UID</label>
              <div className="swap-field-wrapper">
                <User size={18} className="text-muted me-2" />
                <input
                  type="number"
                  name="targetUserId"
                  className="swap-input"
                  placeholder="Enter Officer ID"
                  value={form.targetUserId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="swap-input-group">
              <label className="swap-label">Reason for Swap</label>
              <div className="swap-field-wrapper align-items-start py-2">
                <MessageSquare size={18} className="text-muted me-2 mt-1" />
                <textarea
                  name="reason"
                  className="swap-input"
                  rows="3"
                  placeholder="Brief reason for the exchange..."
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
              className="btn btn-warning btn-lg w-100 fw-bold py-3 text-dark d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <>
                  <Send size={20} />
                  Send Swap Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapShift;
