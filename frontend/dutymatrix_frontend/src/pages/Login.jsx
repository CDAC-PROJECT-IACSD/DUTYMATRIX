import React from "react";
import "../styles/Login.css";
import { useAuth } from "../auth/AuthContext";
import { loginUser } from "../services/api";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser({ email, password });
      login(loginData);
      alert("Login Successful!");
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
      <div className="login-card">
        <div className="login-image">
          <img src="/src/assets/login_img1.png" alt="Login" />
        </div>
        <div className="login-form">
          <h2>Welcome Officer</h2>
          <h4>Please Login To Continue</h4>
          <form onSubmit={handleSubmit}> 
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn">Login</button>

            <p className="signup">
              Don't have an account? <span>Sign up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
