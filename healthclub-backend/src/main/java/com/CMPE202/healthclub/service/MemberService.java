package com.CMPE202.healthclub.service;


import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {
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
    public UserDetailsResponse getUserDetailsFromEmail(String email) throws RecordNotFoundException {
        User user = getUserByEmail(email);
        return UserDetailsResponse.builder().id(user.getId()).firstName(user.getFirstName())
                .lastName(user.getLastName()).role(user.getRole()).email(user.getEmail())
                .homeGym(user.getHomeGym()).build();
    }

}
