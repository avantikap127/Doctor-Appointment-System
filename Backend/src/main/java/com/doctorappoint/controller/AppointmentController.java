package com.doctorappoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import com.doctorappoint.model.Appointment;
import com.doctorappoint.services.AppointmentService; 
import com.doctorappoint.repository.AppointmentRepository;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @PostMapping
    public Appointment book(@RequestBody Appointment appt) {
        return service.bookAppointment(appt);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointments(@PathVariable Long patientId) {
        return service.getPatientAppointments(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable Long doctorId) {
    return service.getDoctorAppointments(doctorId);
}
    @PutMapping("/{id}")
    public Appointment updateStatus(@PathVariable Long id, @RequestParam String status) {
    return service.updateStatus(id, status);
}
}