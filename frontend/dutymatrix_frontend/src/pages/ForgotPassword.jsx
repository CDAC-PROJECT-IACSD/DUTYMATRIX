import { useState } from "react";
import axios from "axios";
import { Mail, ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export default function ForgotPassword({ onOtpSent, onBack }) {
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
      if (onOtpSent) onOtpSent();

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
    <div className="forgot-password-form">
      {msg && (
        <div className={`alert ${msg.includes("successful") || msg.includes("sent") ? "alert-success" : "alert-danger"} py-2 text-center mb-3`}>
          {msg}
        </div>
      )}

      {/* STEP 1: EMAIL */}
      {step === 1 && (
        <>
          <div className="input-group-custom mb-3">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              className="form-control-custom"
              placeholder="Enter Official Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="login-btn w-100 mb-3"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification OTP"}
          </button>
        </>
      )}

      {/* STEP 2: OTP + PASSWORD */}
      {step === 2 && (
        <>
          <div className="input-group-custom mb-2">
            <ShieldCheck className="input-icon" size={20} />
            <input
              className="form-control-custom"
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div className="input-group-custom mb-4">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              className="form-control-custom"
              placeholder="New Secure Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="login-btn w-100 mb-3"
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Reset System Access"}
          </button>
        </>
      )}

      <div className="text-center">
        <span 
          className="text-warning small cursor-pointer d-flex align-items-center justify-content-center"
          onClick={onBack}
        >
          <ArrowLeft size={14} className="me-1" /> Back to Login
        </span>
      </div>
    </div>
  );
}
