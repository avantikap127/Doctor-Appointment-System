package com.doctorappoint.model;

public class DoctorDTO {

    private Long doctorId;
    private String name;
    private String specialization;

    public DoctorDTO(Long doctorId, String name, String specialization) {
        this.doctorId = doctorId;
        this.name = name;
        this.specialization = specialization;
    }

    // getters
    public Long getDoctorId() { return doctorId; }
    public String getName() { return name; }
    public String getSpecialization() { return specialization; }
}