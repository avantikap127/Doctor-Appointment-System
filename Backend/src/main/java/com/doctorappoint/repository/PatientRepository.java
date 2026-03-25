package com.doctorappoint.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.doctorappoint.model.Patient;
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByUser_UserId(Long userId);
}