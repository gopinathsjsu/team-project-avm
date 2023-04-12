package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.repository.GymRepository;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GymService {
    private final GymRepository gymRepository;
    public List<Gym> getAllGymsInTheCity(String city){
        return gymRepository.findByCity(city);
    }
}
