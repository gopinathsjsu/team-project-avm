package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, UserGymScheduleId> {
    List<UserSchedule> findUpComingClassesByUser(User user);
}
