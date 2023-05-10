package com.CMPE202.healthclub.repository;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserActivityTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivityTracker,Long> {
    List<UserActivityTracker> findAllByUser(User user);
    @Query(value = "SELECT activity, SUM(minutes) as total_minutes\n" +
            "FROM user_activity_tracker\n" +
            "WHERE user_id = ? AND creation_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)\n" +
            "and creation_time <= CURRENT_TIMESTAMP()\n"+
            "GROUP BY activity\n" +
            "ORDER BY total_minutes DESC", nativeQuery = true)
    List<Object[]> getTotalMinutesByActivityLastWeek(Long userId);
    @Query(value = "SELECT activity, SUM(minutes) as total_minutes\n" +
            "FROM user_activity_tracker\n" +
            "WHERE user_id = ? AND creation_time >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)\n" +
            "and creation_time <= CURRENT_TIMESTAMP()\n"+
            "GROUP BY activity\n" +
            "ORDER BY total_minutes DESC", nativeQuery = true)
    List<Object[]> getTotalMinutesByActivityLastMonth(Long userId);
    @Query(value = "SELECT activity, SUM(minutes) as total_minutes\n" +
            "FROM user_activity_tracker\n" +
            "WHERE user_id = ? AND creation_time >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)\n" +
            "and creation_time <= CURRENT_TIMESTAMP()\n"+
            "GROUP BY activity\n" +
            "ORDER BY total_minutes DESC",nativeQuery = true)
    List<Object[]> getTotalMinutesByActivityLast90Days(Long userId);
}
