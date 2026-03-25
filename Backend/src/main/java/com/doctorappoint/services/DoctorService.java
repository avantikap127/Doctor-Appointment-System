package com.doctorappoint.services;

import com.doctorappoint.model.Doctor;
import com.doctorappoint.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepo;

    // ✅ Get doctors by hospital
public List<Doctor> getDoctorsByHospital(Long hospitalId) {
    return doctorRepo.getDoctorsByHospital(hospitalId);
}
  public Doctor save(Doctor doctor) {
        return doctorRepo.save(doctor);
    }
}