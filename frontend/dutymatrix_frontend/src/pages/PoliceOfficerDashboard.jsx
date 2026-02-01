import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import "../styles/dashboard.css";

export default function PoliceOfficerDashboard() {
  const { user, token } = useAuth();

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
    filledByUserId: user?.uid,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        filledByUserId: user.uid,
      };

      const response = await axios.post(
        "http://localhost:8080/fir",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
        filledByUserId: user.uid,
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to file FIR. Please check all fields."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h4 className="welcome-message">Welcome {user?.userName}</h4>

      {/* 🔘 ACTION BUTTONS */}
      <div className="d-flex gap-3 mt-4 flex-wrap mb-4">
        <Link to="/leave" className="btn btn-outline-primary btn-sm">
          Apply Leave
        </Link>

        <Link to="/shift-swap" className="btn btn-outline-light btn-sm">
          Shift Swap
        </Link>

        <Link to="/my-shifts" className="btn btn-outline-success btn-sm">
          My Shifts
        </Link>
      </div>

      {/* 📝 FIR FORM */}
      <div className="row justify-content-center">
        <div className="col-md-10">
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
    </div>
  );
}
