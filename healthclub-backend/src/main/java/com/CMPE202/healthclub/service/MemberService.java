package com.CMPE202.healthclub.service;


import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserActivityTracker;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import com.CMPE202.healthclub.entity.user.enums.ACTIVITY;
import com.CMPE202.healthclub.entity.user.enums.REG_STATUS;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.User.UserActivityRequest;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.repository.GymClassScheduleRepository;
import com.CMPE202.healthclub.repository.UserActivityRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import com.CMPE202.healthclub.repository.UserScheduleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserScheduleRepository userScheduleRepository;
    @Autowired
    private final GymClassScheduleRepository gymClassScheduleRepository;
    @Autowired
    private final UserActivityRepository userActivityRepository;
    //Private Utility Methods
    private User getUserByEmail(String email) throws RecordNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RecordNotFoundException("User not found on records");
        }
        return optionalUser.get();
    }
    private User findUserById(Long id) throws RecordNotFoundException{
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new RecordNotFoundException("User not found for user id "+ id);
        }
        return user.get();
    }
    //Return user details from Email
    public UserDetailsResponse getUserDetailsFromEmail(String email) throws RecordNotFoundException {
        User user = getUserByEmail(email);
        return UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                .homeGym(user.getHomeGymId()).build();
    }
    //Book a particular Gym Class for the User
    public UserSchedule bookGymClassForUser(Long userId, Long scheduleId) throws RecordNotFoundException, BadServerException, InvalidOperationException {
        //Find the user
        User user = findUserById(userId);
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
        List<UserSchedule> userSchedules = user.getUserSchedules();
        //Validations
        if(userSchedules != null){
            if(user.getRole() == ROLE.FREE_TRIAL_MEMBER && userSchedules.size()>=1)
                throw new InvalidOperationException("You can book only one free trial class");
            for(UserSchedule userSchedule: userSchedules){
                if(userSchedule.getId().getScheduleId().equals(scheduleId)){
                    throw new RuntimeException("You have already booked this class");
                }
            }
        }

        //Sign up the user for the class
        UserSchedule userSchedule = UserSchedule.builder().user(user).gymSchedule(gymClass.get())
                .registrationStatus(REG_STATUS.SCHEDULED).id(new UserGymScheduleId(scheduleId,userId)).build();
        user.getUserSchedules().add(userSchedule);
        userRepository.save(user);

        return userSchedule;
    }
    //Return the list of upcoming classed for the user
    public List<UserSchedule> getUpcomingGymClassesForUser(Long userId) throws RecordNotFoundException{
        User user = findUserById(userId);
        List<UserSchedule> allGymClasses =  userScheduleRepository.findUpComingClassesByUser(user.getId(), LocalDateTime.now());
        return allGymClasses;
    }

    public UserActivityTracker logActivityForUser(Long userId,
                                      ACTIVITY activity,
                                      Long timeInMinutes) throws RecordNotFoundException {
       User user = findUserById(userId);
       UserActivityTracker userActivity = UserActivityTracker.builder().minutes(timeInMinutes)
               .user(user).creationTime(LocalDateTime.now()).activity(activity).build();
       return userActivityRepository.save(userActivity);

    }
    public List<UserActivityTracker> getActivityForUser(Long userId) throws RecordNotFoundException {
        User user = findUserById(userId);
        return userActivityRepository.findAllByUser(user);
    }



}
