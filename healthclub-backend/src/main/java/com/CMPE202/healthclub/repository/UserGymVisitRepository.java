package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserGymVisitRepository extends JpaRepository<UserGymVisit, Long> {
    Optional<UserGymVisit> findUserGymVisitByUserAndGymAndCheckoutDateTime(User user, Gym gym, LocalDateTime localDateTime);
    Optional<List<UserGymVisit>> findByGymAndCheckoutDateTime(Gym gym, LocalDateTime localDateTime);
    @Query(value = "SELECT sum(timestampdiff(hour,checkin_date_time,checkout_date_time)) " +
            "FROM healthclub.user_gym_visit " +
            "where gym_id = ?1 and checkin_date_time>= ?2\n" +
            "and checkout_date_time <= ?3", nativeQuery = true)
    Integer totalHoursByGymAndCheckoutCheckInDateTime(Long gymId, LocalDateTime startTime, LocalDateTime endTime);
    @Query(value = "SELECT * FROM healthclub.user_gym_visit\n" +
            "where gym_id = ?1 and checkin_date_time>= ?2 \n" +
            "and checkout_date_time <= ?3", nativeQuery = true)
    List<UserGymVisit> findByGymAndCheckoutCheckInDateTime(Long gymId, LocalDateTime startTime, LocalDateTime endTime);

    @Query(value = "SELECT  DATE_FORMAT(DATE(MAX(u.checkin_date_time)), '%Y-%m-%d') AS date, SUM(TIMESTAMPDIFF(HOUR, u.checkin_date_time, u.checkout_date_time)) AS hoursSpent "
            + "FROM healthclub.user_gym_visit u "
            + "WHERE u.gym_id = ?1 AND u.checkin_date_time BETWEEN ?2 AND ?3 "
            + "GROUP BY DATE(u.checkin_date_time), YEAR(u.checkin_date_time), MONTH(u.checkin_date_time), WEEK(u.checkin_date_time)",nativeQuery = true)
    List<Object[]> getHoursSpentByDayWeekMonth( Long gymId, LocalDateTime startTime, LocalDateTime endTime);

    @Query(value = "SELECT DATE_FORMAT(u.checkin_date_time, '%Y-%m-%d %H:00:00') AS hour, "
            + "DAYNAME(u.checkin_date_time) AS dayOfWeek, "
            + "IF(DAYOFWEEK(u.checkin_date_time) IN (1,7), 'weekend', 'weekday') AS weekendOrWeekday, "
            + "COUNT(*) AS visitors "
            + "FROM healthclub.user_gym_visit u "
            + "WHERE u.gym_id = ?1 AND u.checkin_date_time BETWEEN ?2 AND ?3 "
            + "GROUP BY hour, dayOfWeek, weekendOrWeekday",nativeQuery = true)
    List<Object[]> getVisitorsByHourDayOfWeekWeekendOrWeekday(Long gymId,LocalDateTime startTime, LocalDateTime endTime);
}
