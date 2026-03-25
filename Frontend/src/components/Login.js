import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });

    console.log("LOGIN RESPONSE:", res.data);

    // ❗ IMPORTANT CHECK
    if (!res.data.role) {
      alert("Invalid login response");
      return;
    }

    // 🔥 SAVE USER
    localStorage.setItem("user", JSON.stringify(res.data));

    const role = res.data.role.trim().toUpperCase();

    // ❗ NEW CHECK FOR DOCTOR
    if (role === "DOCTOR" && !res.data.doctorId) {
      alert("Doctor profile not created properly. Please register again.");
      return;
    }

    if (role === "PATIENT") {
      window.location.href = "/patient";
    } 
    else if (role === "DOCTOR") {
      window.location.href = "/doctor";   // 🔥 change navigate → window
    } 
    else {
      alert("Invalid role: " + res.data.role);
    }

  } catch (err) {
    console.log("ERROR:", err.response?.data);

    alert(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Login failed"
    );
  }
};

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;