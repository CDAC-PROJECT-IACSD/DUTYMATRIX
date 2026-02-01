import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const CreateShift = () => {
  const { user } = useAuth(); // ✅ logged-in station incharge

  const [formData, setFormData] = useState({
    shtype: "DAY_SHIFT",
    shDate: "",
    shStartTime: "",
    shEndTime: "",
    assignedUserId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        shtype: formData.shtype,
        shDate: formData.shDate,
        shStartTime: formData.shStartTime,
        shEndTime: formData.shEndTime,

        // ✅ REQUIRED BY BACKEND
        stationId: user.stationId,

        // optional
        assignedUserId: formData.assignedUserId
          ? Number(formData.assignedUserId)
          : null,
      };

      const res = await api.post("/shifts", payload);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Failed ❌");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Create Shift</h2>

      <form onSubmit={handleSubmit}>
        <select name="shtype" onChange={handleChange}>
          <option value="DAY_SHIFT">DAY_SHIFT</option>
          <option value="NIGHT_SHIFT">NIGHT_SHIFT</option>
        </select>

        <input type="date" name="shDate" onChange={handleChange} required />
        <input type="time" name="shStartTime" onChange={handleChange} required />
        <input type="time" name="shEndTime" onChange={handleChange} required />

        <input
          type="number"
          name="assignedUserId"
          placeholder="Officer ID (optional)"
          onChange={handleChange}
        />

        <button type="submit">Create Shift</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateShift;
