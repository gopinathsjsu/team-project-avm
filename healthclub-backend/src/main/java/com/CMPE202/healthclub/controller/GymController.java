package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gym")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {
    private final GymService gymService;
    @GetMapping({"/"})
    public List<Gym> getGymData(){
        return gymService.getAllGyms();
    }
    @GetMapping({"/test"})
    public String gymHome() {
        return "<h1>Hi from GymController</h1>";
    }
}
