package com.CMPE202.healthclub.repository;


import com.CMPE202.healthclub.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);
    @Query(value = "SELECT u.* FROM healthclub.user u\n" +
            "inner join healthclub.user_gym_visit as v\n" +
            "on v.user_id = u.id\n" +
            "where v.gym_id = ?1 and v.checkout_date_time IS NULL;",nativeQuery = true )
    Optional<List<User>> findCurrentCheckedInUsers(Long gymId);
}
