package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.repository.GymRepository;
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
    public Boolean checkInUsers(Long gymId, String email) throws RecordNotFoundException, InvalidOperationException {
        //Check if users are enrolled members
        User user = getUserByEmail(email);
        //Check the role of users
        ROLE userRole = user.getRole();
        if(userRole == null || ( userRole != ROLE.MEMBER && userRole != ROLE.FREE_TRIAL_MEMBER )){
            throw new InvalidOperationException("The user is not a member of the HealthClub nor a Free trial member");
        }
        Gym gym = getGymById(gymId);
        UserGymVisit newCheckIn = new UserGymVisit();
        newCheckIn.setUser(user);
        newCheckIn.setGym(gym);
        newCheckIn.setCheckinDateTime(LocalDateTime.now());
        List<UserGymVisit> userGymVisitList = user.getUserGymVisitList();
        //TO DO
        //Should do some validation as to if the user is currently checked into any gym
        userGymVisitList.add(newCheckIn);
        userRepository.save(user);
        return true;
    }

    public List<UserDetailsResponse> getAllCurrentCheckedInUsers(Long gymId){
        //Find all the users who are currently checkedIn to the Gym, but not checkedOut
        ArrayList<UserDetailsResponse> result = new ArrayList<>();
        Optional<List<User>> users = userRepository.findCurrentCheckedInUsers(gymId);
        if(!users.isEmpty()){
            for(User user: users.get()){
                result.add(UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                        .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                        .homeGym(user.getHomeGym()).build());
            }
        }
        return result;
    }

    public Boolean checkOutUsers(Long gymId, String email) throws RecordNotFoundException, InvalidOperationException {

        //Check if users are enrolled members
        User user = getUserByEmail(email);
        //Check the role of users
        ROLE userRole = user.getRole();
        if(userRole == null || ( userRole != ROLE.MEMBER && userRole != ROLE.FREE_TRIAL_MEMBER )){
            throw new InvalidOperationException("The user is not a member of the HealthClub nor a Free trial member");
        }
        Gym gym = getGymById(gymId);
        List<UserGymVisit> userGymVisitList = user.getUserGymVisitList();
        //Get the latest check in made by the user and then update the check out
        if(!userGymVisitList.isEmpty()){
            userGymVisitList.sort((o1, o2) -> o2.getCheckinDateTime().compareTo(o1.getCheckinDateTime()));
            userGymVisitList.get(0).setCheckoutDateTime(LocalDateTime.now());
            userRepository.save(user);
        } else throw new InvalidOperationException("User has not checked into the gym");

        return true;
    }

}
