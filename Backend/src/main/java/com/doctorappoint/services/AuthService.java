package com.doctorappoint.services;

import com.doctorappoint.model.User;
import com.doctorappoint.model.Patient;
import com.doctorappoint.model.Doctor;
import com.doctorappoint.repository.UserRepository;
import com.doctorappoint.repository.PatientRepository;
import com.doctorappoint.repository.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo; // ✅ ADD THIS

    // ✅ Register user
    public User register(User user) {

        if (user.getEmail() == null || user.getPassword() == null) {
            throw new RuntimeException("Email or Password cannot be null");
        }

        User existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("User already exists with this email");
        }

        User savedUser = userRepo.save(user);

        // ✅ PATIENT PROFILE
        if ("PATIENT".equalsIgnoreCase(savedUser.getRole())) {

            Patient patient = new Patient();
            patient.setUser(savedUser);
            patientRepo.save(patient);
        }

        // 🔥 DOCTOR PROFILE (THIS WAS MISSING ❗)
        if ("DOCTOR".equalsIgnoreCase(savedUser.getRole())) {

            Doctor doctor = new Doctor();
            doctor.setUser(savedUser);

            // optional default
            doctor.setSpecialization(user.getSpecialization());

            doctorRepo.save(doctor);
        }

        return savedUser;
    }

    // ✅ Login
    public User login(String email, String password) {

        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }
}