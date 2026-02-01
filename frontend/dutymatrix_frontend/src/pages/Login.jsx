import React from "react";
import "../styles/Login.css";
import { useAuth } from "../auth/AuthContext";
import { loginUser } from "../services/api";
import { Mail, Lock, Shield } from "lucide-react"; // Added Shield icon for police theme
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [error, setError] = React.useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser({ email, password });
      login(loginData);
      // Removed alert for smoother experience, or can replace with a toast
      if(loginData.role === "POLICE_OFFICER"){
        navigate("/dashboard/officer");
      }
      else if(loginData.role === "STATION_INCHARGE"){
        navigate("/dashboard/stationIncharge");
      }
      else if(loginData.role === "COMMISSIONER"){
        navigate("/dashboard/commissioner");
      }
    } catch (err) {
      alert("Login Failed! Please check your credentials. "+ err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="login-card row g-0">
          
          {/* Left Side - Image/Branding */}
          <div className="col-md-6 login-image-section d-none d-md-flex flex-column justify-content-center align-items-center">
             <div className="overlay"></div>
             <div className="brand-content text-center">
                <Shield size={80} className="mb-3 text-warning" />
                <h2 className="brand-title">DUTY MATRIX</h2>
                <p className="brand-subtitle">Secure Force Management System</p>
                <div className="brand-divider"></div>
                <p className="brand-motto">Service • Honour • Safety</p>
             </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-md-6 login-form-section">
            <div className="form-wrapper">
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-2 text-white">Officer Portal</h2>
                <p className="text-white-50">Enter credentials to access the secure network</p>
              </div>

              <form onSubmit={handleSubmit}> 
                <div className="mb-4">
                  <label className="form-label text-uppercase small fw-bold text-white">Official Email</label>
                  <div className="input-group-custom">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      className="form-control-custom"
                      placeholder="officer@police.gov.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="form-label text-uppercase small fw-bold text-white">Secure Password</label>
                  <div className="input-group-custom">
                    <Lock className="input-icon" />
                    <input
                      type="password"
                      className="form-control-custom"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button className="login-btn w-100">
                  SECURE LOGIN
                </button>

                <p className="signup text-center mt-4">
                  New Personnel? <span className="text-warning cursor-pointer">Register Request</span>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
