package com.doctorappoint.services;

import com.doctorappoint.model.Appointment;
import com.doctorappoint.model.Availability;
import com.doctorappoint.repository.AppointmentRepository;
import com.doctorappoint.repository.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.doctorappoint.model.Patient;
import com.doctorappoint.model.Doctor;
import com.doctorappoint.repository.PatientRepository;
import com.doctorappoint.repository.DoctorRepository;
import java.util.List;


@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private AvailabilityRepository slotRepo;
    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    // 🔥 IMPORTANT: Transactional to prevent double booking
    @Transactional
    public Appointment bookAppointment(Appointment appt) {

        // ✅ Validate input
        if (appt.getSlot() == null || appt.getSlot().getSlotId() == null) {
            throw new RuntimeException("Slot missing");
        }

        if (appt.getPatient() == null || appt.getPatient().getPatientId() == null) {
            throw new RuntimeException("Patient missing");
        }

        if (appt.getDoctor() == null || appt.getDoctor().getDoctorId() == null) {
            throw new RuntimeException("Doctor missing");
        }

        // ✅ Fetch from DB
        Availability slot = slotRepo.findById(appt.getSlot().getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        Patient patient = patientRepo.findById(appt.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepo.findById(appt.getDoctor().getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // ✅ FIX: safe boolean check
        if (Boolean.FALSE.equals(slot.getAvailable())) {
            throw new RuntimeException("Slot already booked");
        }

        // ✅ Update slot
        slot.setAvailable(false);
        slotRepo.save(slot);

        // ✅ Set proper objects
        appt.setSlot(slot);
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setStatus("PENDING");

        return appointmentRepo.save(appt);
    }

    // ✅ Get appointments for patient
    public List<Appointment> getPatientAppointments(Long patientId) {

        if (patientId == null) {
            throw new RuntimeException("Patient ID cannot be null");
        }

        List<Appointment> list = appointmentRepo.findByPatient_PatientId(patientId);
        return list != null ? list : new java.util.ArrayList<>();
    }

    public List<Appointment> getDoctorAppointments(Long doctorId) {

    if (doctorId == null) {
        throw new RuntimeException("Doctor ID cannot be null");
    }

    return appointmentRepo.findByDoctor_DoctorId(doctorId);
}
   public Appointment updateStatus(Long id, String status) {

    Appointment appt = appointmentRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appt.setStatus(status);

    return appointmentRepo.save(appt);
}
}