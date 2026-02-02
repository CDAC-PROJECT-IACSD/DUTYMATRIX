// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "../styles/login.css";
// import { Mail, Lock, Shield, User, Phone, Briefcase, MapPin } from "lucide-react";
// import ForgotPassword from "./ForgotPassword";


// export default function Login() {
//   const [mode, setMode] = useState("login"); // login | signup | reset
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { login } = useAuth();
//   const navigate = useNavigate();


//   // <ForgotPassword />


//   // ---------------- LOGIN STATE ----------------
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // ---------------- SIGNUP STATE ----------------
//   const [signupData, setSignupData] = useState({
//     uname: "",
//     uemail: "",
//     upassword: "",
//     uphoneNo: "",
//     urank: "CONSTABLE",
//     urole: "POLICE_OFFICER",
//     station_id: "",
//   });

//   // ---------------- RESET STATE ----------------
//   const [newPassword, setNewPassword] = useState("");

//   // ---------------- LOGIN ----------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const res = await axios.post("http://localhost:9090/auth/login", {
//         email: loginData.email,
//         password: loginData.password,
//       });

//       login(res.data);

//       if (res.data.role === "POLICE_OFFICER") {
//         navigate("/dashboard/officer");
//       } else if (res.data.role === "STATION_INCHARGE") {
//         navigate("/dashboard/stationIncharge");
//       } else if (res.data.role === "COMMISSIONER") {
//         navigate("/dashboard/commissioner");
//       } else {
//         navigate("/");
//       }

//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- SIGNUP ----------------
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       await axios.post("http://localhost:9090/users/signup", {
//         ...signupData,
//         station_id: Number(signupData.station_id),
//         urank: signupData.urank.toUpperCase(),     
//         urole: signupData.urole.toUpperCase(),     
//       });

//       setSuccess("Signup successful. Please login.");
//       setMode("login");

//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Signup failed. Check all fields."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ---------------- RESET PASSWORD ----------------
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please login again.");
//         return;
//       }

//       await axios.post(
//         "http://localhost:9090/auth/reset-password",
//         { newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccess("Password reset successful. Please login.");
//       setMode("login");

//     } catch {
//       setError("Password reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="container h-100 d-flex justify-content-center align-items-center">
//         <div className="login-card row g-0">
          
//           {/* Left Side - Image/Branding */}
//           <div className="col-md-6 login-image-section d-none d-md-flex flex-column justify-content-center align-items-center">
//              <div className="overlay"></div>
//              <div className="brand-content text-center">
//                 <Shield size={80} className="mb-3 text-warning" />
//                 <h2 className="brand-title">DUTY MATRIX</h2>
//                 <p className="brand-subtitle">Secure Force Management System</p>
//                 <div className="brand-divider"></div>
//                 <p className="brand-motto">Service • Honour • Safety</p>
//              </div>
//           </div>

//           {/* Right Side - Form Section */}
//           <div className="col-md-6 login-form-section">
//             <div className="form-wrapper">
              
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold mb-2 text-white">
//                   {mode === 'login' && "Officer Portal"}
//                   {mode === 'signup' && "New Registration"}
//                   {mode === 'reset' && "Reset Password"}
//                 </h2>
//                 <p className="text-white-50">
//                   {mode === 'login' && "Enter credentials to access network"}
//                   {mode === 'signup' && "Fill details to request access"}
//                   {mode === 'reset' && "Enter your new password"}
//                 </p>
//               </div>

//               {success && <div className="alert alert-success text-center mb-3">{success}</div>}
//               {error && <div className="alert alert-danger text-center mb-3">{error}</div>}

//               {/* DEBUG: Login Mode */}
//               {mode === "login" && (
//                 <form onSubmit={handleLogin}> 
//                   <div className="mb-4">
//                     <label className="form-label text-uppercase small fw-bold text-white">Official Email</label>
//                     <div className="input-group-custom">
//                       <Mail className="input-icon" size={20} />
//                       <input
//                         type="email"
//                         className="form-control-custom"
//                         placeholder="officer@police.gov.in"
//                         value={loginData.email}
//                         onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="mb-3">
//                     <label className="form-label text-uppercase small fw-bold text-white">Secure Password</label>
//                     <div className="input-group-custom">
//                       <Lock className="input-icon" size={20} />
//                       <input
//                         type="password"
//                         className="form-control-custom"
//                         placeholder="••••••••"
//                         value={loginData.password}
//                         onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="text-end mb-4">
//                     <span 
//                       className="text-warning small cursor-pointer"
//                       onClick={() => setMode("reset")}
//                     >
//                       Forgot Password?
//                     </span>
//                   </div>

//                   <button className="login-btn w-100" disabled={loading}>
//                     {loading ? "Authenticating..." : "SECURE LOGIN"}
//                   </button>

//                   <p className="signup text-center mt-4">
//                     New Personnel? <span className="text-warning cursor-pointer" onClick={() => setMode("signup")}>Register Request</span>
//                   </p>
//                 </form>
//               )}

//               {/* DEBUG: Signup Mode */}
//               {mode === "signup" && (
//                 <form onSubmit={handleSignup}>
                  
//                   {/* Name */}
//                   <div className="input-group-custom">
//                     <User className="input-icon" size={20} />
//                     <input
//                       className="form-control-custom"
//                       placeholder="Full Name"
//                       value={signupData.uname}
//                       onChange={(e) => setSignupData({ ...signupData, uname: e.target.value })}
//                       required
//                     />
//                   </div>

//                   {/* Email */}
//                   <div className="input-group-custom">
//                     <Mail className="input-icon" size={20} />
//                     <input
//                       className="form-control-custom"
//                       type="email"
//                       placeholder="Official Email"
//                       value={signupData.uemail}
//                       onChange={(e) => setSignupData({ ...signupData, uemail: e.target.value })}
//                       required
//                     />
//                   </div>

//                   {/* Password */}
//                   <div className="input-group-custom">
//                     <Lock className="input-icon" size={20} />
//                     <input
//                       className="form-control-custom"
//                       type="password"
//                       placeholder="Password"
//                       value={signupData.upassword}
//                       onChange={(e) => setSignupData({ ...signupData, upassword: e.target.value })}
//                       required
//                     />
//                   </div>

//                   {/* Phone */}
//                   <div className="input-group-custom">
//                     <Phone className="input-icon" size={20} />
//                     <input
//                       className="form-control-custom"
//                       placeholder="Phone (10 digits)"
//                       value={signupData.uphoneNo}
//                       onChange={(e) => setSignupData({ ...signupData, uphoneNo: e.target.value })}
//                       pattern="[0-9]{10}"
//                       required
//                     />
//                   </div>

//                   {/* Rank & Role Row */}
//                   <div className="row g-2 mb-2">
//                     <div className="col-6">
//                       <div className="input-group-custom">
//                         <Briefcase className="input-icon" size={20} />
//                         <select
//                           className="form-select-custom"
//                           value={signupData.urank}
//                           onChange={(e) => setSignupData({ ...signupData, urank: e.target.value })}
//                           required
//                         >
//                           <option value="CONSTABLE">Constable</option>
//                           <option value="SI">SI</option>
//                           <option value="INSPECTOR">Inspector</option>
//                           <option value="DSP">DSP</option>
//                           <option value="SP">SP</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-6">
//                       <div className="input-group-custom">
//                         <Shield className="input-icon" size={20} />
//                          <select
//                           className="form-select-custom"
//                           value={signupData.urole}
//                           onChange={(e) => setSignupData({ ...signupData, urole: e.target.value })}
//                           required
//                         >
//                           <option value="POLICE_OFFICER">Officer</option>
//                           <option value="STATION_INCHARGE">Incharge</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Station ID */}
//                   <div className="input-group-custom">
//                     <MapPin className="input-icon" size={20} />
//                     <input
//                       className="form-control-custom"
//                       type="number"
//                       placeholder="Station ID"
//                       value={signupData.station_id}
//                       onChange={(e) => setSignupData({ ...signupData, station_id: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <button className="login-btn w-100 mt-3" disabled={loading}>
//                      {loading ? "Registering..." : "SUBMIT REQUEST"}
//                   </button>

//                   <p className="signup text-center mt-3">
//                     Already registered? <span className="text-warning cursor-pointer" onClick={() => setMode("login")}>Login Here</span>
//                   </p>
//                 </form>
//               )}

//               {/* DEBUG: Reset Mode */}
//               {mode === "reset" && (
//                 <form onSubmit={handleResetPassword}>
//                   <div className="mb-4">
//                     <label className="form-label text-uppercase small fw-bold text-white">New Password</label>
//                     <div className="input-group-custom">
//                       <Lock className="input-icon" size={20} />
//                       <input
//                         type="password"
//                         className="form-control-custom"
//                         placeholder="Enter new password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button className="login-btn w-100" disabled={loading}>
//                      {loading ? "Resetting..." : "RESET PASSWORD"}
//                   </button>

//                   <p className="signup text-center mt-4">
//                     Remembered? <span className="text-warning cursor-pointer" onClick={() => setMode("login")}>Back to Login</span>
//                   </p>
//                 </form>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );


  
// }


import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import {
  Mail,
  Lock,
  Shield,
  User,
  Phone,
  Briefcase,
  MapPin,
  ArrowRight,
} from "lucide-react";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const [mode, setMode] = useState("login"); 
  // login | signup | forgot | reset

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

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

      login(res.data);

      if (res.data.role === "POLICE_OFFICER") {
        navigate("/dashboard/officer");
      } else if (res.data.role === "STATION_INCHARGE") {
        navigate("/dashboard/stationIncharge");
      } else if (res.data.role === "COMMISSIONER") {
        navigate("/dashboard/commissioner");
      } else {
        navigate("/");
      }
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
        urank: signupData.urank.toUpperCase(),
        urole: signupData.urole.toUpperCase(),
      });

      setSuccess("Signup successful. Please login.");
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
        setError("Session expired. Login again.");
        return;
      }

      await axios.post(
        "http://localhost:9090/auth/reset-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Password reset successful.");
      setMode("login");
    } catch {
      setError("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT SIDE - BRANDING */}
        <div className="login-image-section">
          <div className="brand-content">
            <Shield size={80} className="mb-3 text-warning" />
            <h1 className="brand-title">DUTY MATRIX</h1>
            <p className="brand-subtitle">Secure Force Management System</p>
            <div className="brand-divider"></div>
            <p className="brand-motto">Service • Honour • Safety</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="login-form-section">
          <div className="form-wrapper">
            <div className="text-center mb-4">
              <h2 className="text-white fw-bold">
                {mode === "login" && "Officer Portal"}
                {mode === "signup" && "New Registration"}
                {mode === "forgot" && "Access Recovery"}
                {mode === "reset" && "Secure Reset"}
              </h2>
              <p className="text-white-50">
                {mode === "login" && "Enter credentials to access network"}
                {mode === "signup" && "Provide details for personnel record"}
                {mode === "forgot" && "Follow steps to recover account"}
                {mode === "reset" && "Create a new strong password"}
              </p>
            </div>

            {success && <div className="alert alert-success py-2 text-center">{success}</div>}
            {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

            {/* LOGIN FORM */}
            {mode === "login" && (
              <form onSubmit={handleLogin}>
                <div className="input-group-custom mb-3">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    className="form-control-custom"
                    placeholder="Official Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group-custom mb-3">
                  <Lock className="input-icon" size={20} />
                  <input
                    type="password"
                    className="form-control-custom"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="text-end mb-4">
                  <span
                    className="text-warning small cursor-pointer"
                    onClick={() => setMode("forgot")}
                  >
                    Forgot Password?
                  </span>
                </div>

                <button className="login-btn w-100 mb-3" disabled={loading}>
                  {loading ? "Authenticating..." : "Secure Login"}
                </button>

                <p className="text-center text-white-50 small">
                  New Personnel?{" "}
                  <span
                    className="text-warning cursor-pointer"
                    onClick={() => setMode("signup")}
                  >
                    Register Request
                  </span>
                </p>
              </form>
            )}

            {/* SIGNUP FORM */}
            {mode === "signup" && (
              <form onSubmit={handleSignup}>
                <div className="input-group-custom mb-2">
                  <User className="input-icon" size={20} />
                  <input
                    className="form-control-custom"
                    placeholder="Full Name"
                    value={signupData.uname}
                    onChange={(e) => setSignupData({ ...signupData, uname: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group-custom mb-2">
                  <Mail className="input-icon" size={20} />
                  <input
                    className="form-control-custom"
                    type="email"
                    placeholder="Official Email"
                    value={signupData.uemail}
                    onChange={(e) => setSignupData({ ...signupData, uemail: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group-custom mb-2">
                  <Lock className="input-icon" size={20} />
                  <input
                    className="form-control-custom"
                    type="password"
                    placeholder="Secure Password"
                    value={signupData.upassword}
                    onChange={(e) => setSignupData({ ...signupData, upassword: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group-custom mb-2">
                  <Phone className="input-icon" size={20} />
                  <input
                    className="form-control-custom"
                    placeholder="Phone (10 digits)"
                    value={signupData.uphoneNo}
                    onChange={(e) => setSignupData({ ...signupData, uphoneNo: e.target.value })}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <div className="input-group-custom">
                      <Briefcase className="input-icon" size={20} />
                      <select
                        className="form-select-custom"
                        value={signupData.urank}
                        onChange={(e) => setSignupData({ ...signupData, urank: e.target.value })}
                        required
                      >
                        <option value="CONSTABLE">Constable</option>
                        <option value="SI">Sub-Inspector</option>
                        <option value="INSPECTOR">Inspector</option>
                        <option value="DSP">DSP</option>
                        <option value="SP">SP</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-custom">
                      <Shield className="input-icon" size={20} />
                      <select
                        className="form-select-custom"
                        value={signupData.urole}
                        onChange={(e) => setSignupData({ ...signupData, urole: e.target.value })}
                        required
                      >
                        <option value="POLICE_OFFICER">Officer</option>
                        <option value="STATION_INCHARGE">Incharge</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="input-group-custom mb-4">
                  <MapPin className="input-icon" size={20} />
                  <input
                    className="form-control-custom"
                    type="number"
                    placeholder="Station ID"
                    value={signupData.station_id}
                    onChange={(e) => setSignupData({ ...signupData, station_id: e.target.value })}
                    required
                  />
                </div>

                <button className="login-btn w-100" disabled={loading}>
                  {loading ? "Processing..." : "Submit Registry"}
                </button>

                <p className="text-center mt-3 text-white-50 small">
                  Existing Personnel?{" "}
                  <span
                    className="text-warning cursor-pointer"
                    onClick={() => setMode("login")}
                  >
                    Login Securely
                  </span>
                </p>
              </form>
            )}

            {/* FORGOT PASSWORD SECTION */}
            {mode === "forgot" && (
              <ForgotPassword
                onOtpSent={() => setMode("reset")}
                onBack={() => setMode("login")}
              />
            )}

            {/* RESET PASSWORD FORM */}
            {mode === "reset" && (
              <form onSubmit={handleResetPassword}>
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
                <button className="login-btn w-100" disabled={loading}>
                  {loading ? "Updating..." : "Confirm Reset"}
                </button>
                <p className="text-center mt-3">
                  <span
                    className="text-warning cursor-pointer small"
                    onClick={() => setMode("login")}
                  >
                    Back to Login
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
