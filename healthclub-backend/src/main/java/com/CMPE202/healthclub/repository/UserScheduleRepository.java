package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, UserGymScheduleId> {
    @Query(value = "SELECT u.* FROM healthclub.user u\n" +
            "inner join healthclub.user_gym_visit as v\n" +
            "on v.user_id = u.id\n" +
            "where v.gym_id = ?1 and v.checkout_date_time IS NULL;",nativeQuery = true )
    List<UserSchedule> findUpComingClassesByUser(User user, LocalDateTime currentTime);
}
