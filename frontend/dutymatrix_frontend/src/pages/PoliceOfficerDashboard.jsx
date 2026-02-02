import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api";
import "../styles/dashboard.css";
import LeaveRequest from "./LeaveRequest";
import SwapShift from "./SwapShift";

export default function PoliceOfficerDashboard() {
  const { user } = useAuth();

  // ================= VIEW STATES =================
  const [showFIR, setShowFIR] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [showMyShifts, setShowMyShifts] = useState(false);

  // ================= FIR STATES =================
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    complainantName: "",
    complainantPhone: "",
    crimeType: "",
    crimeDescription: "",
    crimeLocation: "",
    crimeDateTime: "",
    sectionsApplied: "",
    accussedKnown: false,
    accusedName: "",
    severity: "LOW",
    filledByUserId: user?.userId,
  });

  // ================= HELPERS =================
  const resetViews = () => {
    setShowFIR(false);
    setShowLeave(false);
    setShowSwap(false);
    setShowMyShifts(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUBMIT FIR =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        crimeDateTime: formData.crimeDateTime
          ? `${formData.crimeDateTime}:00` // ADD SECONDS
          : null,
        severity: formData.severity.toUpperCase(), // FORCE ENUM STYLE
        filledByUserId: user.userId,
      };

      if (!payload.accussedKnown) {
        delete payload.accusedName;
      }

      const response = await API.post("/fir", payload);

      setSuccess(`FIR Filed Successfully! FIR ID: ${response.data.firId}`);

      setFormData({
        complainantName: "",
        complainantPhone: "",
        crimeType: "",
        crimeDescription: "",
        crimeLocation: "",
        crimeDateTime: "",
        sectionsApplied: "",
        accussedKnown: false,
        accusedName: "",
        severity: "LOW",
        filledByUserId: user.userId,
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to file FIR. Please check all fields.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h4 className="welcome-message">Welcome {user?.userName}</h4>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="button-container">
        {/* LEAVE REQUEST */}
        <button
          className="dashboard-btn btn-primary"
          onClick={() => {
            resetViews();
            setShowLeave(true);
          }}
        >
          <img src="/src/assets/checkok.gif" alt="Icon" className="btn-icon" />
          {showLeave ? "Hide Leave Request" : "Apply Leave"}
        </button>

        {/* SHIFT SWAP */}
        <button
          className="dashboard-btn btn-warning"
          onClick={() => {
            resetViews();
            setShowSwap(true);
          }}
        >
          <img src="/src/assets/checkok.gif" alt="Icon" className="btn-icon" />
          {showSwap ? "Hide Shift Swap" : "Shift Swap"}
        </button>

        {/* MY SHIFTS */}
        <button
          className="dashboard-btn btn-success"
          onClick={() => {
            resetViews();
            setShowMyShifts(true);
          }}
        >
          <img src="/src/assets/checkok.gif" alt="Icon" className="btn-icon" />
          {showMyShifts ? "Hide My Shifts" : "My Shifts"}
        </button>

        {/* FILE FIR (THIS CONTROLS FORM VISIBILITY) */}
        <button
          className="dashboard-btn btn-danger"
          onClick={() => {
            if (showFIR) {
              resetViews();
            } else {
              resetViews();
              setShowFIR(true);
            }
          }}
        >
          <img src="/src/assets/checkok.gif" alt="Icon" className="btn-icon" />
          {showFIR ? "Hide File FIR" : "File FIR"}
        </button>
      </div>

      {/* ================= CONTENT AREA ================= */}
      <div className="content-area mt-4">
        {showLeave && (
          <div className="card shadow-sm p-4">
            <LeaveRequest />
          </div>
        )}

        {showSwap && (
          <div className="card shadow-sm p-4">
            <SwapShift />
          </div>
        )}

        {showMyShifts && (
          <div className="card shadow-sm p-4 text-center">
            <h4>My Duties</h4>
            <p className="text-muted">
              Duty roster functionality coming soon...
            </p>
          </div>
        )}

        {/* ================= FIR FORM ================= */}
        {showFIR && (
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  File New First Information Report (FIR)
                </div>

                <div className="card-body p-4">
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* FORM (SUBMIT BUTTON ONLY SUBMITS) */}
                  <form onSubmit={handleSubmit}>
                    <h4 className="mb-3">Complainant Details</h4>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Complainant Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="complainantName"
                          value={formData.complainantName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="complainantPhone"
                          value={formData.complainantPhone}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>

                    <hr />

                    <h4 className="mb-3">Crime Details</h4>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Crime Type</label>
                        <select
                          className="form-select"
                          name="crimeType"
                          value={formData.crimeType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Crime Type</option>
                          <option>Theft</option>
                          <option>Assault</option>
                          <option>Fraud</option>
                          <option>Cybercrime</option>
                          <option>Harassment</option>
                          <option>Missing Person</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Severity</label>
                        <select
                          className="form-select"
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          required
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                          <option value="CRITICAL">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Crime Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="crimeLocation"
                          value={formData.crimeLocation}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Crime Date & Time</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="crimeDateTime"
                          value={formData.crimeDateTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Crime Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="crimeDescription"
                        value={formData.crimeDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Sections Applied</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sectionsApplied"
                        value={formData.sectionsApplied}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="accussedKnown"
                        checked={formData.accussedKnown}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">
                        Is Accused Known?
                      </label>
                    </div>

                    {formData.accussedKnown && (
                      <div className="mb-3">
                        <label className="form-label">Accused Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="accusedName"
                          value={formData.accusedName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "File FIR"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
