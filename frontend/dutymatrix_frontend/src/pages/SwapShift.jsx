import { useState } from "react";
import api from "../api/axios";

const SwapShift = () => {
  const [form, setForm] = useState({
    shiftId: "",
    targetUserId: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Request Shift Swap</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="shiftId"
          placeholder="My Assigned Shift ID"
          value={form.shiftId}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="targetUserId"
          placeholder="Target Officer User ID"
          value={form.targetUserId}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          required
        />

        <button type="submit">Request Swap</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SwapShift;
