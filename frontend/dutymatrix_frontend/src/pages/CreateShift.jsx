import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import "../styles/create_shift.css";
import { Clock, Calendar, User, Shield, ArrowRight } from "lucide-react";

const CreateShift = () => {
  const { user, token } = useAuth(); // ✅ logged-in station incharge

  const [formData, setFormData] = useState({
    shtype: "DAY_SHIFT",
    shDate: "",
    shStartTime: "",
    shEndTime: "",
    assignedUserId: "",
  });

  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await api.get("/users/station-incharge/officers", config);
      setOfficers(res.data);
    } catch (err) {
      console.error("Failed to fetch officers", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const payload = {
        shtype: formData.shtype,
        shDate: formData.shDate,
        shStartTime: formData.shStartTime,
        shEndTime: formData.shEndTime,
        stationId: user.stationId,
        assignedUserId: formData.assignedUserId
          ? Number(formData.assignedUserId)
          : null,
      };

      const res = await api.post("/shifts", payload);
      setMessage("Shift created successfully! ✅");
      setIsError(false);
    } catch (err) {
      setMessage(err.response?.data || "Failed to create shift ❌");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-shift-container">
      <h2 className="create-shift-title">Schedule New Duty</h2>

      <form onSubmit={handleSubmit}>
        <div className="shift-form-group">
          <label className="shift-label">Shift Type</label>
          <div className="shift-input-wrapper">
            <Shield className="shift-icon" size={20} />
            <select 
              className="shift-select" 
              name="shtype" 
              value={formData.shtype}
              onChange={handleChange}
            >
              <option value="DAY_SHIFT">Day Shift</option>
              <option value="NIGHT_SHIFT">Night Shift</option>
            </select>
          </div>
        </div>

        <div className="shift-form-group">
          <label className="shift-label">Duty Date</label>
          <div className="shift-input-wrapper">
            <Calendar className="shift-icon" size={20} />
            <input 
              className="shift-input"
              type="date" 
              name="shDate" 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <div className="shift-form-group">
              <label className="shift-label">Start Time</label>
              <div className="shift-input-wrapper">
                <Clock className="shift-icon" size={18} />
                <input 
                  className="shift-input"
                  type="time" 
                  name="shStartTime" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="shift-form-group">
              <label className="shift-label">End Time</label>
              <div className="shift-input-wrapper">
                <Clock className="shift-icon" size={18} />
                <input 
                  className="shift-input"
                  type="time" 
                  name="shEndTime" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="shift-form-group">
          <label className="shift-label">Assign Officer</label>
          <div className="shift-input-wrapper">
            <User className="shift-icon" size={20} />
            <select 
              className="shift-select" 
              name="assignedUserId" 
              value={formData.assignedUserId}
              onChange={handleChange}
            >
              <option value="">-- Select Officer (Optional) --</option>
              {officers.map((off) => (
                <option key={off.userId} value={off.userId}>
                  {off.name} ({off.rank})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="create-shift-btn" type="submit" disabled={loading}>
          {loading ? "Scheduling..." : "Create Duty Shift"}
        </button>
      </form>

      {message && (
        <div className={`shift-status-msg ${isError ? 'msg-error' : 'msg-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateShift;
