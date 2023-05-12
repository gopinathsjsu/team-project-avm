package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface GymClassScheduleRepository extends JpaRepository<GymSchedule, Long> {
    List<GymSchedule> findAllByGym(Gym gym);
    @Query(value = "SELECT * FROM healthclub.gym_schedule\n" +
            "where start_time >= ?1 and end_time <= ?2 and  gym_id = ?3 order by gym_schedule.start_time asc",nativeQuery = true )
    List<GymSchedule> findAllByGymStartAndEndTime(LocalDateTime startDateTime, LocalDateTime endDateTime, Long gym);
    @Query(value = "SELECT * FROM healthclub.gym_schedule\n" +
            "where start_time >= ?1 and gym_id = ?2 order by gym_schedule.start_time",nativeQuery = true )
    List<GymSchedule> findUpComingClassesByGymId(LocalDateTime startDateTime, Long gym);

}
