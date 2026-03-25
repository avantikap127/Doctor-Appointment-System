package com.doctorappoint.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doctorappoint.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient_PatientId(Long patientId);
    List<Appointment> findByDoctor_DoctorId(Long doctorId);
}
