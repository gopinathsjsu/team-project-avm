package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserActivityTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivityTracker,Long> {
    List<UserActivityTracker> findAllByUser(User user);
}
