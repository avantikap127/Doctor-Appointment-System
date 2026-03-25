import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);

  // 🔥 NEW STATES (FOR SLOT)
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // 🟢 LOAD APPOINTMENTS
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "DOCTOR") {
      alert("Unauthorized access");
      window.location.href = "/";
      return;
    }

    if (!user.doctorId) {
      alert("Doctor ID missing. Please login again.");
      window.location.href = "/";
      return;
    }

    loadAppointments(user.doctorId);

  }, []);

  const loadAppointments = async (doctorId) => {
    try {
      const res = await API.get(`/appointments/doctor/${doctorId}`);
      setAppointments(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  // 🔥 ADD SLOT FUNCTION
  const addSlot = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!date || !timeSlot) {
      alert("Please fill date and time");
      return;
    }

    try {
      await API.post("/slots", {
        date,
        timeSlot,
        available: true,
        doctor: {
          doctorId: user.doctorId   // 🔥 IMPORTANT
        }
      });

      alert("Slot Added Successfully");

      setDate("");
      setTimeSlot("");

    } catch (err) {
      console.log(err);
      alert("Error adding slot");
    }
  };

  // 🟢 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}?status=${status}`);

      alert("Status updated");

      const user = JSON.parse(localStorage.getItem("user"));
      loadAppointments(user.doctorId);

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div>

      <h2>Doctor Dashboard</h2>

      {/* 🔥 ADD SLOT SECTION */}
      <div className="card">
        <h3>Add Slot</h3>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Time (e.g. 10:00 AM)"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />

        <button onClick={addSlot}>Add Slot</button>
      </div>

      <hr />

      {/* 🟢 APPOINTMENTS */}
      <h3>Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        appointments.map(a => (
          <div className="card" key={a.appointmentId}>

            <p>
              <b>Patient:</b> {a.patient?.user?.name || "N/A"}
            </p>

            <p>
              <b>Slot:</b> {a.slot?.date} - {a.slot?.timeSlot}
            </p>

            <p>
              <b>Status:</b> {a.status}
            </p>

            <button onClick={() => updateStatus(a.appointmentId, "APPROVED")}>
              Approve
            </button>

            <button onClick={() => updateStatus(a.appointmentId, "CANCELLED")}>
              Reject
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default DoctorDashboard;