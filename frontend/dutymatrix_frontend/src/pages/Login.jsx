import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);

  // ---------------- LOGIN STATE ----------------
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ---------------- SIGNUP STATE ----------------
  const [signupData, setSignupData] = useState({
    uname: "",
    uemail: "",
    upassword: "",
    uphoneNo: "",
    urank: "CONSTABLE",
    urole: "POLICE_OFFICER",
    station_id: "",
  });

  // ---------------- RESET STATE ----------------
  const [newPassword, setNewPassword] = useState("");

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setLoggedUser(email);
  }, []);

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:9090/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", loginData.email);
      setLoggedUser(loginData.email);

      setSuccess("Login successful");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:9090/users/signup", {
        ...signupData,
        station_id: Number(signupData.station_id),
      });

      setSuccess("Signup successful. Please login.");
      setMode("login");
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESET PASSWORD ----------------
 const handleResetPassword = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again. Token missing.");
      setLoading(false);
      return;
    }

    await axios.post(
      "http://localhost:9090/auth/reset-password",
      {
        newPassword: newPassword,   // ✅ ONLY password in body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ JWT IN HEADER
        },
      }
    );

    setSuccess("Password reset successful. Please login.");
    setMode("login");

  } catch (err) {
    console.error(err);
    setError("Password reset failed");
  } finally {
    setLoading(false);
  }
};

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.clear();
    setLoggedUser(null);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Police App</span>
        {loggedUser ? (
          <div className="text-white">
            Logged in as <b>{loggedUser}</b>
            <button className="btn btn-sm btn-danger ms-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <span className="text-white">Not Logged In</span>
        )}
      </nav>

      {/* CARD */}
      <div className="container mt-5">
        <div className="col-md-6 mx-auto card p-4">
          <h4 className="text-center mb-3 text-capitalize">{mode}</h4>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* LOGIN */}
          {mode === "login" && (
            <form onSubmit={handleLogin}>
              <input className="form-control mb-2" placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required />

              <input className="form-control mb-3" type="password" placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required />

              <button className="btn btn-primary w-100" disabled={loading}>
                Login
              </button>

              <div className="text-center mt-3">
                <button type="button" className="btn btn-link" onClick={() => setMode("reset")}>
                  Forgot password?
                </button>
                <br />
                <button type="button" className="btn btn-link" onClick={() => setMode("signup")}>
                  Create account
                </button>
              </div>
            </form>
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <form onSubmit={handleSignup}>
              <input className="form-control mb-2" placeholder="Full Name"
                onChange={(e) => setSignupData({ ...signupData, uname: e.target.value })} required />

              <input className="form-control mb-2" placeholder="Email"
                onChange={(e) => setSignupData({ ...signupData, uemail: e.target.value })} required />

              <input className="form-control mb-2" type="password" placeholder="Password"
                onChange={(e) => setSignupData({ ...signupData, upassword: e.target.value })} required />

              <input className="form-control mb-2" placeholder="Phone Number"
                onChange={(e) => setSignupData({ ...signupData, uphoneNo: e.target.value })} required />

              <select className="form-control mb-2"
                onChange={(e) => setSignupData({ ...signupData, urank: e.target.value })}>
                <option value="CONSTABLE">CONSTABLE</option>
                <option value="SI">SI</option>
                <option value="INSPECTOR">INSPECTOR</option>
              </select>

              <select className="form-control mb-2"
                onChange={(e) => setSignupData({ ...signupData, urole: e.target.value })}>
                <option value="POLICE_OFFICER">POLICE_OFFICER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <input className="form-control mb-3" type="number" placeholder="Station ID"
                onChange={(e) => setSignupData({ ...signupData, station_id: e.target.value })} required />

              <button className="btn btn-success w-100">Signup</button>
              <button type="button" className="btn btn-link w-100" onClick={() => setMode("login")}>
                Back to login
              </button>
            </form>
          )}

          {/* RESET */}
          {mode === "reset" && (
            <form onSubmit={handleResetPassword}>
              <input className="form-control mb-3" type="password" placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required />

              <button className="btn btn-warning w-100">Reset Password</button>
              <button type="button" className="btn btn-link w-100" onClick={() => setMode("login")}>
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
