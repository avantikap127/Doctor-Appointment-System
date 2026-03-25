import React, { useEffect, useState } from "react";
import API from "../services/api";

function PatientDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login again");
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(storedUser);

    console.log("PATIENT USER:", user);

    // ✅ ONLY CHECK ROLE
    if (!user || user.role !== "PATIENT") {
      alert("Unauthorized access");
      window.location.href = "/";
      return;
    }

    // ✅ ONLY CHECK patientId (IMPORTANT FIX)
    if (!user.patientId) {
      alert("Patient profile not found. Please register again.");
      window.location.href = "/";
      return;
    }

    API.get(`/appointments/patient/${user.patientId}`)
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load appointments");
        setLoading(false);
      });

  }, []);

  return (
    <div>

      <h2>My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map(a => (
          <div className="card" key={a.appointmentId}>

            <p>
              <b>Doctor:</b>{" "}
              {a.doctor?.user?.name || "N/A"} 
            </p>

            <p>
              <b>Status:</b>{" "}
              <span style={{
                color:
                  a.status === "APPROVED" ? "green" :
                  a.status === "CANCELLED" ? "red" :
                  "orange"
              }}>
                {a.status}
              </span>
            </p>

            <p>
              <b>Slot:</b>{" "}
              {a.slot ? `${a.slot.date} - ${a.slot.timeSlot}` : "N/A"}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default PatientDashboard;