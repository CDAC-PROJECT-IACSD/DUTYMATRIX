<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/dashboard.css";

export default function PoliceOfficerDashboard() {
  const { user } = useAuth();
=======
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import '../styles/dashboard.css'

export default function PoliceOfficerDashboard() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    complainantName: '',
    complainantPhone: '',
    crimeType: '',
    crimeDescription: '',
    crimeLocation: '',
    crimeDateTime: '',
    sectionsApplied: '',
    accussedKnown: false,
    accusedName: '',
    severity: 'LOW', // Default value
    filledByUserId: user?.uid 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        filledByUserId: user.uid // Ensure user ID is set
      };

      const response = await axios.post('http://localhost:8080/fir', payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess(`FIR Filed Successfully! FIR ID: ${response.data.firId}`);
      setFormData({
        complainantName: '',
        complainantPhone: '',
        crimeType: '',
        crimeDescription: '',
        crimeLocation: '',
        crimeDateTime: '',
        sectionsApplied: '',
        accussedKnown: false,
        accusedName: '',
        severity: 'LOW',
        filledByUserId: user.uid
      });
    } catch (err) {
        console.error(err);
      setError(err.response?.data?.message || 'Failed to file FIR. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };
>>>>>>> 6168a45bf4c37217e7882a8c5b45957241273d24

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
<<<<<<< HEAD
      <h4 className="welcome-message">Welcome {user.userName}</h4>

      {/* Buttons section */}
      <div className="d-flex gap-3 mt-4 flex-wrap">

        <Link to="/leave" className="btn btn-outline-primary btn-sm">
          Apply Leave
        </Link>

        {/* Shift Swap Button */}
        <Link to="/shift-swap" className="btn btn-outline-light btn-sm">
          Shift Swap
        </Link>

        <Link to="/my-shifts" className="btn btn-outline-success btn-sm">
          My Shifts
        </Link>

=======
      <h3 className="welcome-message">Welcome {user?.userName}</h3>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-file-earmark-text me-2"></i> File New First Information Report (FIR)
            </div>
            <div className="card-body p-4">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3 text-dark">Complainant Details</h4>
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
                      minLength="3"
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
                      title="10 digit mobile number"
                    />
                  </div>
                </div>

                <hr className="my-4 text-secondary"/>
                <h4 className="mb-3 text-dark">Crime Details</h4>
                
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
                      <option value="Theft">Theft</option>
                      <option value="Assault">Assault</option>
                      <option value="Fraud">Fraud</option>
                      <option value="Cybercrime">Cybercrime</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Missing Person">Missing Person</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Severity Level</label>
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
                    <label className="form-label">Date & Time of Crime</label>
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
                    name="crimeDescription"
                    rows="3"
                    value={formData.crimeDescription}
                    onChange={handleChange}
                    required
                    minLength="10"
                  ></textarea>
                </div>

                <hr className="my-4 text-secondary"/>
                <h4 className="mb-3 text-dark">Legal & Investigation Info</h4>

                <div className="mb-3">
                  <label className="form-label">Applied Sections (IPC/BNS)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="sectionsApplied"
                    placeholder="e.g. Section 378, 420"
                    value={formData.sectionsApplied}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="row mb-4 bg-light p-3 rounded mx-1">
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="accussedKnown"
                        name="accussedKnown"
                        checked={formData.accussedKnown}
                        onChange={handleChange}
                      />
                      <label className="form-check-label text-dark fw-bold" htmlFor="accussedKnown">
                        Is Accused Known?
                      </label>
                    </div>
                  </div>
                  
                  {formData.accussedKnown && (
                    <div className="col-md-6 mt-3">
                        <label className="form-label text-dark">Accused Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="accusedName"
                          value={formData.accusedName}
                          onChange={handleChange}
                          required={formData.accussedKnown}
                        />
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="reset" className="btn btn-secondary me-md-2" onClick={() => setFormData({
                    complainantName: '',
                    complainantPhone: '',
                    crimeType: '',
                    crimeDescription: '',
                    crimeLocation: '',
                    crimeDateTime: '',
                    sectionsApplied: '',
                    accussedKnown: false,
                    accusedName: '',
                    severity: 'LOW',
                    filledByUserId: user.uid
                  })}>Clear Form</button>
                  <button type="submit" className="dashboard-btn btn-primary" disabled={loading}>
                    {loading ? (
                       <>
                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                         Submitting...
                       </>
                    ) : (
                        <>
                        <i className="bi bi-send-fill me-2"></i> File FIR
                        </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
>>>>>>> 6168a45bf4c37217e7882a8c5b45957241273d24
      </div>
    </div>
  );
}
