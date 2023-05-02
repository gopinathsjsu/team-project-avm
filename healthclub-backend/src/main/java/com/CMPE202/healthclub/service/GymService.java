package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.repository.GymClassScheduleRepository;
import com.CMPE202.healthclub.repository.GymRepository;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GymService {
    @Autowired
    private final GymRepository gymRepository;
    @Autowired
    private final GymClassScheduleRepository gymClassScheduleRepository;
    public List<Gym> getAllGymsInTheCity(String city){
        return gymRepository.findAllByCity(city);
    }
    public List<GymSchedule> getClassSchedule(Long id){
        Gym gym = gymRepository.findById(id).get();
        return gymClassScheduleRepository.findAllByGym(gym);
    }
}
