package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, UserGymScheduleId> {
    @Query(value = "SELECT u.* FROM healthclub.user_schedule as u\n" +
            "inner join healthclub.gym_schedule as s\n" +
            "on s.schedule_id = u.schedule_id\n" +
            "and s.start_time >= ?2\n" +
            "and u.user_id = ?1",nativeQuery = true )
    List<UserSchedule> findUpComingClassesByUser(Long userId, LocalDateTime currentTime);
}
