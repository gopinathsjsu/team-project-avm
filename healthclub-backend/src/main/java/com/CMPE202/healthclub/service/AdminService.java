package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class AdminService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final GymRepository gymRepository;
    public User getUserByEmail(String email) throws RecordNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RecordNotFoundException("User not found on records");
        }
        return optionalUser.get();
    }
    public Boolean checkInUsers(Long gymId, String email) throws RecordNotFoundException, InvalidOperationException {
        //Check if users are enrolled members
        User user = getUserByEmail(email);
        //Check the role of users
        ROLE userRole = user.getRole();
        if(userRole == null || ( userRole != ROLE.MEMBER && userRole != ROLE.FREE_TRIAL_MEMBER )){
            throw new InvalidOperationException("The user is not a member of the HealthClub nor a Free trial member");
        }
        Optional<Gym> gym = gymRepository.findById(gymId);
        UserGymVisit newCheckIn = new UserGymVisit();
        newCheckIn.setUser(user);
        newCheckIn.setGym(gym.get());
        newCheckIn.setCheckinDateTime(LocalDateTime.now());
        List<UserGymVisit> userGymVisitList = user.getUserGymVisitList();
        userGymVisitList.add(newCheckIn);
        userRepository.save(user);
        return true;
    }

}
