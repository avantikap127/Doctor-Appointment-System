package com.doctorappoint.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doctorappoint.model.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}