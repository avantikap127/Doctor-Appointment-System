import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import BookAppointment from "./components/BookAppointment";
import Admin from "./components/Admin";

function App() {

  // ✅ GET USER ONCE (FIX)
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Protected Route
  const ProtectedRoute = ({ children, role }) => {

    if (!user) return <Navigate to="/" />;

    const userRole = user.role?.trim().toUpperCase();

    if (role && userRole !== role) return <Navigate to="/" />;

    return children;
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <BrowserRouter>

      <div className="navbar">
        <h2>Doctor Appointment</h2>

        <div>

          {!user ? (
            <>
              <Link to="/" style={{ color: "white", marginRight: "10px" }}>Login</Link>
              <Link to="/register" style={{ color: "white" }}>Register</Link>
            </>
          ) : (
            <>
              {user.role === "PATIENT" && (
                <>
                  <Link to="/patient" style={{ color: "white", marginRight: "10px" }}>Dashboard</Link>
                  <Link to="/book" style={{ color: "white", marginRight: "10px" }}>Book</Link>
                </>
              )}

              {user.role === "DOCTOR" && (
                <Link to="/doctor" style={{ color: "white", marginRight: "10px" }}>Dashboard</Link>
              )}

              <button onClick={logout} style={{ marginLeft: "10px" }}>
                Logout
              </button>
            </>
          )}

        </div>
      </div>

      <div className="container">
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/patient"
            element={
              <ProtectedRoute role="PATIENT">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="DOCTOR">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book"
            element={
              <ProtectedRoute role="PATIENT">
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route path="/admin" element={<Admin />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;