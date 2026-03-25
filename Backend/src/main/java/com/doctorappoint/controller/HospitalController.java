package com.doctorappoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.doctorappoint.model.Hospital;
import com.doctorappoint.services.HospitalService;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private HospitalService service;

    @GetMapping
    public List<Hospital> getHospitals() {
        return service.getAllHospitals();
    }

    @PostMapping
    public Hospital addHospital(@RequestBody Hospital hospital) {
    return service.addHospital(hospital);
}
}