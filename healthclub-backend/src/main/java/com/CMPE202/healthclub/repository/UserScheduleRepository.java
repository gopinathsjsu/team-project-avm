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

    @Query(value = "SELECT SUM(TIMESTAMPDIFF(HOUR, gs.start_time, gs.end_time)) AS total_hours_spent "
            + "FROM user_schedule us "
            + "INNER JOIN gym_schedule gs ON us.schedule_id = gs.schedule_id "
            + "WHERE us.user_id = ?1 "
            + "AND us.registration_status = 1 "
            + "AND gs.start_time >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK)\n"
            + "and gs.start_time <= CURRENT_DATE()", nativeQuery = true)
    Integer getTotalHoursSpentLastWeek(Long userId);

    @Query(value = "SELECT SUM(TIMESTAMPDIFF(HOUR, gs.start_time, gs.end_time)) AS total_hours_spent "
            + "FROM user_schedule us "
            + "INNER JOIN gym_schedule gs ON us.schedule_id = gs.schedule_id "
            + "WHERE us.user_id = ?1 "
            + "AND us.registration_status = 1 "
            + "AND gs.start_time >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)\n"
            + "and gs.start_time <= CURRENT_DATE()", nativeQuery = true)
    Integer getTotalHoursSpentLastMonth(Long userId);

    @Query(value = "SELECT SUM(TIMESTAMPDIFF(HOUR, gs.start_time, gs.end_time)) AS total_hours_spent "
            + "FROM user_schedule us "
            + "INNER JOIN gym_schedule gs ON us.schedule_id = gs.schedule_id "
            + "WHERE us.user_id = ?1 "
            + "AND us.registration_status = 1 "
            + "AND gs.start_time >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)\n"
            + "and gs.start_time <= CURRENT_DATE()", nativeQuery = true)
    Integer getTotalHoursSpentLast90Days(Long userId);


}
