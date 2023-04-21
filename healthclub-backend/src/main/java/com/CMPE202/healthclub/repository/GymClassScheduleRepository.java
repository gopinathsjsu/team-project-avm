package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GymClassScheduleRepository extends JpaRepository<GymSchedule, Long> {
    List<GymSchedule> findAllByGym(Gym gym);
}
