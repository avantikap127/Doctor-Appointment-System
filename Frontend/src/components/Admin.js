import React, { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // ✅ SINGLE useEffect (FIXED)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Login first");
      window.location.href = "/";
      return;
    }

    loadHospitals();
    loadAllDoctors();

  }, []);

  // 🔹 Load hospitals
  const loadHospitals = async () => {
    try {
      const res = await API.get("/hospitals");
      setHospitals(Array.isArray(res.data) ? res.data : []);
    } catch {
      setHospitals([]);
    }
  };

  // 🔹 Load ALL doctors (IMPORTANT)
  const loadAllDoctors = async () => {
    try {
      const res = await API.get("/doctors/all");
      console.log("DOCTORS:", res.data);

      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch {
      setDoctors([]);
    }
  };

  // ✅ ADD HOSPITAL
  const addHospital = async () => {
    if (!hospitalName || !location) {
      alert("Enter all fields");
      return;
    }

    await API.post("/hospitals", {
      name: hospitalName,
      location
    });

    alert("Hospital Added");

    setHospitalName("");
    setLocation("");

    loadHospitals();
  };

  // ✅ ASSIGN DOCTOR → HOSPITAL
  const assignDoctor = async () => {

    if (!selectedDoctor || !selectedHospital) {
      alert("Select doctor and hospital");
      return;
    }

    await API.post(
      `/doctors/assign?doctorId=${selectedDoctor}&hospitalId=${selectedHospital}`
    );

    alert("Doctor Assigned Successfully");
  };

  // ✅ ADD SLOT
  const addSlot = async () => {

    if (!selectedDoctor || !date || !timeSlot) {
      alert("Fill all fields");
      return;
    }

    await API.post("/slots", {
      date,
      timeSlot,
      available: true,
      doctor: { doctorId: Number(selectedDoctor) }
    });

    alert("Slot Added");

    setDate("");
    setTimeSlot("");
  };

  return (
    <div className="card">

      <h2>Admin Panel</h2>

      {/* 🏥 ADD HOSPITAL */}
      <h3>Add Hospital</h3>

      <input
        placeholder="Hospital Name"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={addHospital}>Add Hospital</button>

      <hr />

      {/* 👨‍⚕️ ASSIGN DOCTOR */}
      <h3>Assign Doctor to Hospital</h3>

      {/* SELECT HOSPITAL */}
      <select onChange={(e) => setSelectedHospital(e.target.value)}>
        <option value="">Select Hospital</option>
        {hospitals.map(h => (
          <option key={h.hospitalId} value={h.hospitalId}>
            {h.name}
          </option>
        ))}
      </select>

      {/* SELECT DOCTOR */}
      <select onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>

        {Array.isArray(doctors) && doctors.map(d => (
          <option key={d.doctorId} value={d.doctorId}>
            {d.name} 
          </option>
        ))}
      </select>

      <button onClick={assignDoctor}>
        Assign Doctor
      </button>

      <hr />

      {/* ⏰ ADD SLOT */}
      <h3>Add Slot</h3>

      <select onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>

        {Array.isArray(doctors) && doctors.map(d => (
          <option key={d.doctorId} value={d.doctorId}>
            {d.name}
          </option>
        ))}
      </select>

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
  );
}

export default Admin;