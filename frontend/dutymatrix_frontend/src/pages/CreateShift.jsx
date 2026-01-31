import { useState } from "react";
import api from "../api/axios";

const CreateShift = () => {
  const [formData, setFormData] = useState({
    shtype: "DAY_SHIFT",
    shDate: "",
    shStartTime: "",
    shEndTime: "",
    stationId: "",
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
        ...formData,
        stationId: Number(formData.stationId),
        assignedUserId: Number(formData.assignedUserId),
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
        <input type="number" name="stationId" placeholder="Station ID" onChange={handleChange} required />
        <input type="number" name="assignedUserId" placeholder="Officer ID" onChange={handleChange} required />

        <button type="submit">Create Shift</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateShift;
