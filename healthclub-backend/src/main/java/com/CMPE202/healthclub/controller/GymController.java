package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gym")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {
    private final GymService gymService;
    @GetMapping({"/{city}"})
    public List<Gym> getGymData(@PathVariable String city){
        return gymService.getAllGymsInTheCity(city);
    }
    @GetMapping({"/test"})
    public String gymHome() {
        return "<h1>Hi from GymController</h1>";
    }
}
