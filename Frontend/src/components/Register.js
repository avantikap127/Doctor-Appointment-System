import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });

  
  const navigate = useNavigate();

  const register = async () => {
  try {
    const res = await API.post("/auth/register", user);

    alert("Registered successfully");
    navigate("/");

  } catch {
    alert("Registration failed");
  }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setUser({...user, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
      <input placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})} />

      <select onChange={(e) => setUser({...user, role: e.target.value})}>
        <option value="PATIENT">Patient</option>
        <option value="DOCTOR">Doctor</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;