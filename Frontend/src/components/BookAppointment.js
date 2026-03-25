import React, { useEffect, useState } from "react";
import API from "../services/api";

function BookAppointment() {

  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [hospitalId, setHospitalId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [slotId, setSlotId] = useState("");

  // 🟢 Load hospitals
  useEffect(() => {
    API.get("/hospitals")
      .then(res => setHospitals(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🟢 Load doctors
  const handleHospitalChange = (e) => {
    const id = e.target.value;
    setHospitalId(id);

    API.get(`/doctors?hospitalId=${id}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

    setDoctorId("");
    setSlots([]);
  };

  // 🟢 Load slots
  const handleDoctorChange = (e) => {
    const id = e.target.value;
    setDoctorId(id);

    API.get(`/slots?doctorId=${id}`)
      .then(res => setSlots(res.data))
      .catch(err => console.log(err));

    setSlotId("");
  };

  // 🟢 FINAL FIXED BOOK FUNCTION
  const book = async () => {

    if (!hospitalId || !doctorId || !slotId) {
      alert("Please select all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 IMPORTANT DEBUG
    console.log("FINAL DATA:", {
      patientId: user?.patientId,
      doctorId,
      slotId
    });

    // 🔥 EXTRA SAFETY (MAIN FIX)
    if (!slotId || slotId === "" || Number(slotId) <= 0) {
      alert("Invalid slot selected");
      return;
    }

    try {
      await API.post("/appointments", {
        patient: { patientId: Number(user?.patientId) },
        doctor: { doctorId: parseInt(doctorId) },
        slot: { slotId: parseInt(slotId) }   // 🔥 CRITICAL FIX
      });

      alert("Appointment Booked Successfully!");

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Booking failed"
      );
    }
  };

  return (
    <div className="card">

      <h2>Book Appointment</h2>

      {/* Hospital */}
      <label>Select Hospital</label>
      <select value={hospitalId} onChange={handleHospitalChange}>
        <option value="">-- Select Hospital --</option>
        {hospitals.map(h => (
          <option key={h.hospitalId} value={h.hospitalId}>
            {h.name}
          </option>
        ))}
      </select>

      {/* Doctor */}
      {doctors.length > 0 && (
        <>
          <label>Select Doctor</label>
          <select value={doctorId} onChange={handleDoctorChange}>
            <option value="">-- Select Doctor --</option>
            {doctors.map(d => (
              <option key={d.doctorId} value={d.doctorId}>
                {d.user?.name}  
              </option>
            ))}
          </select>
        </>
      )}

      {/* Slot */}
      {slots.length > 0 && (
        <>
          <label>Select Slot</label>
          <select value={slotId} onChange={(e) => setSlotId(e.target.value)}>
            <option value="">-- Select Slot --</option>
            {slots.map(s => (
              <option key={s.slotId} value={String(s.slotId)}>
                {s.date} - {s.timeSlot}
              </option>
            ))}
          </select>
        </>
      )}

      <br /><br />
      <button onClick={book}>Confirm Booking</button>

    </div>
  );
}

export default BookAppointment;