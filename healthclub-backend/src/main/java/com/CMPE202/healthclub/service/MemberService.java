package com.CMPE202.healthclub.service;


import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import com.CMPE202.healthclub.entity.user.enums.REG_STATUS;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.repository.GymClassScheduleRepository;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final GymRepository gymRepository;
    @Autowired
    private final GymClassScheduleRepository gymClassScheduleRepository;
    public User getUserByEmail(String email) throws RecordNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RecordNotFoundException("User not found on records");
        }
        return optionalUser.get();
    }
    public UserDetailsResponse getUserDetailsFromEmail(String email) throws RecordNotFoundException {
        User user = getUserByEmail(email);
        return UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                .homeGym(user.getHomeGymId()).build();
    }
    public UserSchedule bookGymClassForUser(Long userId, Long scheduleId) throws RecordNotFoundException, BadServerException{
        //Find the user
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new RecordNotFoundException("User not found for user id "+userId);
        }
        //Find the Gym schedule
        Optional<GymSchedule> gymClass = gymClassScheduleRepository.findById(scheduleId);
        if(gymClass.isEmpty()){
            throw new RecordNotFoundException("A class with the schedule id not found");
        }
        //Check if the class is full
        List<UserSchedule> signUpList = gymClass.get().getSignUpList();
        if(signUpList.size() == gymClass.get().getMaxOccupancy()){
            throw new BadServerException("Class reached full capacity");
        }
        //Sign up the user for the class
        UserSchedule userSchedule = UserSchedule.builder().user(user.get()).gymSchedule(gymClass.get())
                .registrationStatus(REG_STATUS.SCHEDULED).id(new UserGymScheduleId(scheduleId,userId)).build();
        user.get().getUserSchedules().add(userSchedule);
        userRepository.save(user.get());

        return userSchedule;
    }

}
