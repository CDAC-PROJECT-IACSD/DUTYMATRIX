import { useState } from "react";
import axios from "axios";

export default function VerifyOtpReset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const resetPassword = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/auth/verify-otp`, {
        email,
        otp,
        newPassword: password,
      });
      setMsg("Password reset successful");
    } catch {
      setMsg("Invalid OTP or error");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h4>Verify OTP</h4>

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={resetPassword}>
        Reset Password
      </button>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
