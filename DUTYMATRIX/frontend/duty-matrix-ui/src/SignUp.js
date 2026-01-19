import React, { useState } from "react";

function Signup() {

  const [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphoneNo: "",
    upassword: "",
    urank: "",
    urole: "",
    station_id: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data);
      } else {
        setMessage("Signup failed");
      }

    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>DutyMatrix | User Signup</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          name="uname"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          name="uemail"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="uphoneNo"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <input
          name="upassword"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {/* USER RANK */}
        <select name="urank" onChange={handleChange} required>
          <option value="">Select Rank</option>
          <option value="CONSTABLE">CONSTABLE</option>
          <option value="INSPECTOR">INSPECTOR</option>
          <option value="DSP">DSP</option>
          <option value="SP">SP</option>
          <option value="SENIOR_SP">SENIOR SP</option>
        </select>

        {/* USER ROLE */}
        <select name="urole" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="POLICE_OFFICER">POLICE OFFICER</option>
          <option value="STATION_INCHARGE">STATION INCHARGE</option>
          <option value="COMMISSIONER">COMMISSIONER</option>
        </select>

        <input
          name="station_id"
          type="number"
          placeholder="Station ID"
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "80px auto",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    borderRadius: "8px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default Signup;
