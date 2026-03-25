package com.doctorappoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.doctorappoint.model.Doctor;
import com.doctorappoint.model.Hospital;
import com.doctorappoint.repository.DoctorRepository;
import com.doctorappoint.repository.HospitalRepository;
import com.doctorappoint.services.DoctorService;
import com.doctorappoint.model.DoctorDTO;
@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService service;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private HospitalRepository hospitalRepo;

    // ✅ Get doctors by hospital
    @GetMapping
    public List<Doctor> getDoctors(@RequestParam Long hospitalId) {
        return service.getDoctorsByHospital(hospitalId);
    }

    // ❌ REMOVE THIS (IMPORTANT)
    // @PostMapping
    // public Doctor addDoctor(@RequestBody Doctor doctor) {
    //     return service.save(doctor);
    // }

    // 🔥 NEW: ASSIGN HOSPITAL TO REGISTERED DOCTOR
   @PostMapping("/assign")
public Doctor assignHospital(
        @RequestParam Long doctorId,
        @RequestParam Long hospitalId) {

    Doctor doctor = doctorRepo.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

    Hospital hospital = hospitalRepo.findById(hospitalId)
            .orElseThrow(() -> new RuntimeException("Hospital not found"));

    doctor.setHospital(hospital);

    Doctor saved = doctorRepo.save(doctor);

    return saved;
}

@GetMapping("/all")
public List<DoctorDTO> getAllDoctors() {

    return doctorRepo.findAll()
            .stream()
            .filter(d -> d.getUser() != null)
            .map(d -> new DoctorDTO(
                    d.getDoctorId(),
                    d.getUser().getName(),
                    d.getSpecialization()
            ))
            .toList();
}
}