package com.doctorappoint.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doctorappoint.model.Availability;
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByDoctor_DoctorIdAndAvailableTrue(Long doctorId);
}