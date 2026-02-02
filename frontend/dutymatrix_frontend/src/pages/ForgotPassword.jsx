import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = send otp, 2 = verify otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    if (!email) {
      setMsg("Please enter email");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      await axios.post(
        "http://localhost:9090/auth/forgot-password",
        null,
        { params: { email } }
      );

      setMsg("OTP sent to your email");
      setStep(2); // move to verify step

    } catch (err) {
      console.error(err);
      setMsg("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    if (!otp || !newPassword) {
      setMsg("Please enter OTP and new password");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      await axios.post("http://localhost:9090/auth/verify-otp", {
        email,
        otp,
        newPassword,
      });

      setMsg("Password reset successful. Please login.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");

    } catch (err) {
      console.error(err);
      setMsg("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h4 className="mb-3 text-center">
        {step === 1 ? "Forgot Password" : "Verify OTP"}
      </h4>

      {/* STEP 1: EMAIL */}
      {step === 1 && (
        <>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {/* STEP 2: OTP + PASSWORD */}
      {step === 2 && (
        <>
          <input
            className="form-control mb-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP & Reset Password"}
          </button>
        </>
      )}

      {msg && <p className="mt-3 text-center">{msg}</p>}
    </div>
  );
}
