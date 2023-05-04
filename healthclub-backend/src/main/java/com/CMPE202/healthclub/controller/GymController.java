package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.enums.ACTIVITY;
import com.CMPE202.healthclub.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
    @GetMapping({"/schedule/{gymid}"})
    public List<GymSchedule> getClassSchedule(@PathVariable Long gymid){
        return gymService.getClassSchedule(gymid);
    }

    @GetMapping({"/activity"})
    public List<ACTIVITY> getActivitiesInHealthClub(){
        return Arrays.stream(ACTIVITY.values()).toList();
    }
}
