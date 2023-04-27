package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserGymVisitRepository extends JpaRepository<UserGymVisit, Long> {
    Optional<UserGymVisit> findUserGymVisitByUserAndGymAndCheckoutDateTime(User user, Gym gym, LocalDateTime localDateTime);
}
