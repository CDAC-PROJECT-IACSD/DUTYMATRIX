import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import API, { getMyShifts } from "../services/api";
import "../styles/dashboard.css";
import LeaveRequest from "./LeaveRequest";
import SwapShift from "./SwapShift";
import { 
  Shield, 
  Calendar, 
  RefreshCcw, 
  ClipboardList,
  User,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  FileText
} from "lucide-react";

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
  const [validated, setValidated] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [loadingShifts, setLoadingShifts] = useState(false);

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
    setValidated(true);

    // Basic HTML5 validation check
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      return;
    }

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

  const fetchShifts = async () => {
    setLoadingShifts(true);
    try {
      const data = await getMyShifts();
      setShifts(data);
    } catch (err) {
      console.error("Failed to fetch shifts", err);
    } finally {
      setLoadingShifts(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h5 className="welcome-message">
        Welcome, {user?.userName} | ID: {user?.userId}
      </h5>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="button-container">
        {/* LEAVE REQUEST */}
        <button
          className={`dashboard-btn btn-primary ${showLeave ? 'active' : ''}`}
          onClick={() => {
            resetViews();
            setShowLeave(true);
          }}
        >
          <Calendar size={20} className="me-2" />
          {showLeave ? "Hide Leave Request" : "Apply Leave"}
        </button>

        {/* SHIFT SWAP */}
        <button
          className={`dashboard-btn btn-warning ${showSwap ? 'active' : ''}`}
          onClick={() => {
            resetViews();
            setShowSwap(true);
          }}
        >
          <RefreshCcw size={20} className="me-2" />
          {showSwap ? "Hide Shift Swap" : "Shift Swap"}
        </button>

        {/* MY SHIFTS */}
        <button
          className={`dashboard-btn btn-success ${showMyShifts ? 'active' : ''}`}
          onClick={() => {
            resetViews();
            setShowMyShifts(true);
            fetchShifts();
          }}
        >
          <ClipboardList size={20} className="me-2" />
          {showMyShifts ? "Hide My Shifts" : "My Shifts"}
        </button>

        {/* FILE FIR (THIS CONTROLS FORM VISIBILITY) */}
        <button
          className={`dashboard-btn btn-danger ${showFIR ? 'active' : ''}`}
          onClick={() => {
            if (showFIR) {
              resetViews();
            } else {
              resetViews();
              setShowFIR(true);
            }
          }}
        >
          <Shield size={20} className="me-2" />
          {showFIR ? "Hide File FIR" : "File FIR"}
        </button>
      </div>

      {/* ================= CONTENT AREA ================= */}
      <div className="content-area mt-4">
        {showLeave && (
          <LeaveRequest />
        )}

        {showSwap && (
          <SwapShift />
        )}

        {showMyShifts && (
          <div className="leave-approval-container mt-0 p-4 text-center">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <ClipboardList className="text-success me-3" size={32} />
              <h3 className="leave-title mb-0">My Duties</h3>
            </div>
            <div className="card-body py-4">
              {loadingShifts ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" />
                  <p className="mt-2 text-muted">Loading your roster...</p>
                </div>
              ) : shifts.length === 0 ? (
                <p className="text-muted fs-5">No shifts assigned to you yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-striped table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Shift Type</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shifts.map((s) => (
                        <tr key={s.shiftId}>
                          <td className="fw-bold">{s.shiftDate}</td>
                          <td>
                            <span className={`badge ${s.shiftType === 'DAY_SHIFT' ? 'bg-warning text-dark' : 'bg-dark border border-secondary'}`}>
                              {s.shiftType.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="text-info">{s.startTime}</td>
                          <td className="text-info">{s.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= FIR FORM ================= */}
        {showFIR && (
          <div className="leave-approval-container mt-0 p-4">
            <div className="d-flex align-items-center mb-4">
              <Shield className="text-danger me-3" size={32} />
              <h3 className="leave-title mb-0">New FIR Registration</h3>
            </div>

            <div className="card-body">
              {success && (
                <div className="alert alert-success py-2 text-center mb-4">{success}</div>
              )}
              {error && (
                <div className="alert alert-danger py-2 text-center mb-4">{error}</div>
              )}

              {/* FORM (SUBMIT BUTTON ONLY SUBMITS) */}
              <form 
                onSubmit={handleSubmit} 
                className={`row g-4 text-light ${validated ? 'was-validated' : ''}`}
                noValidate
              >
                <div className="col-12">
                  <h5 className="text-info mb-3 d-flex align-items-center">
                    <User size={18} className="me-2" /> Complainant Details
                  </h5>
                </div>

                <div className="col-md-6 mt-0">
                  <div className="swap-input-group">
                    <label className="swap-label">Complainant Name</label>
                    <div className="swap-field-wrapper">
                      <input
                        type="text"
                        className="swap-input"
                        name="complainantName"
                        placeholder="Full Name"
                        value={formData.complainantName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-0">
                  <div className="swap-input-group">
                    <label className="swap-label">Phone Number</label>
                    <div className="swap-field-wrapper">
                      <Phone size={18} className="text-muted me-2" />
                      <input
                        type="tel"
                        className="swap-input"
                        name="complainantPhone"
                        placeholder="10-digit mobile"
                        value={formData.complainantPhone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <h5 className="text-warning mb-3 d-flex align-items-center">
                    <FileText size={18} className="me-2" /> Incident Particulars
                  </h5>
                </div>

                <div className="col-md-6 mt-0">
                  <div className="swap-input-group">
                    <label className="swap-label">Crime Type</label>
                    <div className="swap-field-wrapper">
                      <select
                        className="swap-input"
                        name="crimeType"
                        value={formData.crimeType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option>Theft</option>
                        <option>Assault</option>
                        <option>Fraud</option>
                        <option>Cybercrime</option>
                        <option>Harassment</option>
                        <option>Missing Person</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-0">
                  <div className="swap-input-group">
                    <label className="swap-label">Severity</label>
                    <div className="swap-field-wrapper">
                      <AlertTriangle size={18} className="text-muted me-2" />
                      <select
                        className="swap-input"
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
                </div>

                <div className="col-md-6">
                  <div className="swap-input-group">
                    <label className="swap-label">Crime Location</label>
                    <div className="swap-field-wrapper">
                      <MapPin size={18} className="text-muted me-2" />
                      <input
                        type="text"
                        className="swap-input"
                        name="crimeLocation"
                        placeholder="Exact area/landmark"
                        value={formData.crimeLocation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="swap-input-group">
                    <label className="swap-label">Crime Date & Time</label>
                    <div className="swap-field-wrapper">
                      <Clock size={18} className="text-muted me-2" />
                      <input
                        type="datetime-local"
                        className="swap-input"
                        name="crimeDateTime"
                        value={formData.crimeDateTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="swap-input-group">
                    <label className="swap-label">Crime Description</label>
                    <div className="swap-field-wrapper py-2">
                      <textarea
                        className="swap-input"
                        rows="3"
                        name="crimeDescription"
                        placeholder="Provide detailed account of the incident..."
                        value={formData.crimeDescription}
                        onChange={handleChange}
                        style={{ resize: 'none' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="swap-input-group">
                    <label className="swap-label">Sections Applied</label>
                    <div className="swap-field-wrapper">
                      <input
                        type="text"
                        className="swap-input"
                        name="sectionsApplied"
                        placeholder="IPC/Legal sections"
                        value={formData.sectionsApplied}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="form-check form-switch custom-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="accussedKnown"
                      id="accusedSwitch"
                      checked={formData.accussedKnown}
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-light ms-2" htmlFor="accusedSwitch">
                      Is Accused Known?
                    </label>
                  </div>
                </div>

                {formData.accussedKnown && (
                  <div className="col-md-6">
                    <div className="swap-input-group">
                      <label className="swap-label">Accused Name</label>
                      <div className="swap-field-wrapper">
                        <input
                          type="text"
                          className="swap-input"
                          name="accusedName"
                          placeholder="Name of accused"
                          value={formData.accusedName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-12 mt-4 text-center">
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg w-100 fw-bold py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : (
                      <Shield size={20} className="me-2" />
                    )}
                    {loading ? "Submitting..." : "File Official FIR"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
