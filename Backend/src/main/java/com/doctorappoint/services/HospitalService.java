package com.doctorappoint.services;

import com.doctorappoint.model.Hospital;
import com.doctorappoint.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HospitalService {

    @Autowired
    private HospitalRepository repo;

    public List<Hospital> getAllHospitals() {
        return repo.findAll();
    }
    public Hospital addHospital(Hospital hospital) {
        return repo.save(hospital);
    }
}