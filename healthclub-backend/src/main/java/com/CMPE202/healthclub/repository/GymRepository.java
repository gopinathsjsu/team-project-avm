package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GymRepository extends JpaRepository<Gym, Long> {
    List<Gym> findAllByCity(String city);
    @Query(value = "SELECT distinct city FROM healthclub.gym;",nativeQuery = true)
    List<String> getAllCities();
}
