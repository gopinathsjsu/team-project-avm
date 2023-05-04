package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserGymVisitRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @Autowired
    private final UserGymVisitRepository userGymVisitRepository;
    public UserDetailsResponse getUserDetailsFromEmail(String email) throws RecordNotFoundException {
        User user = getUserByEmail(email);
        return UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                .homeGym(user.getHomeGymId()).build();
    }
    public User getUserByEmail(String email) throws RecordNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RecordNotFoundException("User not found on records");
        }
        return optionalUser.get();
    }
    private Gym getGymById(Long gymId) throws RecordNotFoundException {
        Optional<Gym> gym = gymRepository.findById(gymId);
        if(gym.isEmpty()){
            throw new RecordNotFoundException("Gym not found on records");
        }
        return gym.get();
    }
    public UserGymVisit checkInUsers(Long gymId, String email) throws RecordNotFoundException, InvalidOperationException, BadServerException {
        //Check if users are enrolled members
        User user = getUserByEmail(email);
        //Check the role of users
        ROLE userRole = user.getRole();
        if(userRole == null || ( userRole != ROLE.MEMBER && userRole != ROLE.FREE_TRIAL_MEMBER )){
            throw new InvalidOperationException("The user is not a member of the HealthClub nor a Free trial member");
        }
        Gym gym = getGymById(gymId);
        Optional<UserGymVisit> currentCheckIn = userGymVisitRepository.findUserGymVisitByUserAndGymAndCheckoutDateTime(user,gym,
                null);
        if(!currentCheckIn.isEmpty()){
            throw new InvalidOperationException("The user is already checked In to the gym at "+currentCheckIn.get().getCheckinDateTime());
        }
        UserGymVisit newCheckIn = new UserGymVisit();
        newCheckIn.setUser(user);
        newCheckIn.setGym(gym);
        newCheckIn.setCheckinDateTime(LocalDateTime.now());
        List<UserGymVisit> userGymVisitList = user.getUserGymVisitList();
        //TO DO
        //Should do some validation as to if the user is currently checked into any gym
        userGymVisitList.add(newCheckIn);
        userRepository.save(user);
        currentCheckIn = userGymVisitRepository.findUserGymVisitByUserAndGymAndCheckoutDateTime(user,gym,
                null);
        if(currentCheckIn.isEmpty()){
            throw new BadServerException("The checkIn was unsuccessful");
        }
        return currentCheckIn.get();
    }

    public List<UserGymVisit> getAllCurrentCheckedInUsers(Long gymId) throws RecordNotFoundException{
        //Find the gym
        Gym gym = getGymById(gymId);
        //Find all the users who are currently checkedIn to the Gym, but not checkedOut
        ArrayList<UserDetailsResponse> result = new ArrayList<>();
        //Optional<List<User>> users = userRepository.findCurrentCheckedInUsers(gymId);
        Optional<List<UserGymVisit>> userGymVisitList = userGymVisitRepository.findByGymAndCheckoutDateTime(gym,null);
        /*
        if(!users.isEmpty()){

            for(User user: users.get()){
                result.add(UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                        .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                        .homeGym(user.getHomeGymId()).build());
            }
        }
        */
        return userGymVisitList.get();
    }

    public UserGymVisit checkOutUsers(Long userGymVisitId) throws InvalidOperationException {
        Optional<UserGymVisit> userGymVisit = userGymVisitRepository.findById(userGymVisitId);
        if(userGymVisit.isEmpty()){
            throw new InvalidOperationException("Cannot find this check In record");
        }
        userGymVisit.get().setCheckoutDateTime(LocalDateTime.now());
        return userGymVisitRepository.save(userGymVisit.get());
    }

}
