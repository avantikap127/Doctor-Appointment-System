package com.doctorappoint.services;

import com.doctorappoint.model.Availability;
import com.doctorappoint.repository.AvailabilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AvailabilityService {

    @Autowired
    private AvailabilityRepository repo;

    // ✅ Get slots
    public List<Availability> getSlots(Long doctorId) {
        if (doctorId == null) {
            throw new RuntimeException("Doctor ID cannot be null");
        }
        return repo.findByDoctor_DoctorIdAndAvailableTrue(doctorId);
    }

    // ✅ Add slot
    @Transactional
    public Availability addSlot(Availability slot) {

        if (slot == null || slot.getDoctor() == null) {
            throw new RuntimeException("Invalid slot data");
        }

        Long doctorId = slot.getDoctor().getDoctorId();

        if (doctorId == null) {
            throw new RuntimeException("Doctor ID missing");
        }

        slot.setAvailable(true);

        return repo.save(slot);
    }
}