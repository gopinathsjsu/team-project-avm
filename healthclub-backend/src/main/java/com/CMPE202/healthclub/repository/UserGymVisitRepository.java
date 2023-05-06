package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
    Integer findByGymAndCheckoutCheckInDateTime(Long gymId, LocalDateTime startTime, LocalDateTime endTime);
}
