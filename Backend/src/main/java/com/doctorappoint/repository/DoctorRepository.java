package com.doctorappoint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.doctorappoint.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // ❌ Old (remove or ignore)
    // List<Doctor> findByHospital_HospitalId(Long hospitalId);

    // ✅ FINAL WORKING (native query)
    @Query(value = "SELECT * FROM doctor WHERE hospital_id = :hospitalId", nativeQuery = true)
    List<Doctor> getDoctorsByHospital(@Param("hospitalId") Long hospitalId);

    Doctor findByUser_UserId(Long userId);
}