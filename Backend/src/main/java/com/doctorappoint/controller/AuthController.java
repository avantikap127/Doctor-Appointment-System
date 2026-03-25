package com.doctorappoint.controller;

import com.doctorappoint.model.User;
import com.doctorappoint.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }
@PostMapping("/login")
public Map<String, Object> login(@RequestBody User user) {

    User u = service.login(user.getEmail(), user.getPassword());

    Map<String, Object> response = new HashMap<>();

    response.put("userId", u.getUserId());
    response.put("role", u.getRole());

    // ✅ IMPORTANT
    if ("PATIENT".equalsIgnoreCase(u.getRole()) && u.getPatient() != null) {
        response.put("patientId", u.getPatient().getPatientId());
    }

    if ("DOCTOR".equalsIgnoreCase(u.getRole()) && u.getDoctor() != null) {
        response.put("doctorId", u.getDoctor().getDoctorId());
    }

    return response;
}
}