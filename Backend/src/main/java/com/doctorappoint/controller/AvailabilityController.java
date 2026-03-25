package com.doctorappoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doctorappoint.model.Availability;
import com.doctorappoint.services.AvailabilityService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/slots")
public class AvailabilityController {

    @Autowired
    private AvailabilityService service;

    @GetMapping
    public List<Availability> getSlots(@RequestParam Long doctorId) {
        return service.getSlots(doctorId);
    }

    @PostMapping
    public Availability addSlot(@RequestBody Availability slot) {
        return service.addSlot(slot);
    }
}