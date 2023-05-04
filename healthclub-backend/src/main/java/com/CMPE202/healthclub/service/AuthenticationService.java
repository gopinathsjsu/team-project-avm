package com.CMPE202.healthclub.service;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.model.authentication.AuthenticationRequest;
import com.CMPE202.healthclub.model.authentication.AuthenticationResponse;
import com.CMPE202.healthclub.model.User.UserModel;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserRepository;
import com.CMPE202.healthclub.security.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final GymRepository gymRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse registerUser(UserModel userModel) {
        String email = userModel.getEmail();
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        //Get user's homeGym
        Long homeGymId = userModel.getHomeGym();

        User user = User.builder()
                .email(userModel.getEmail())
                .firstName(userModel.getFirstName())
                .lastName(userModel.getLastName())
                .role(userModel.getRole())
                .password(passwordEncoder.encode(userModel.getPassword()))
                .homeGymId(homeGymId)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }
    public AuthenticationResponse authenticate(AuthenticationRequest authRequest) throws InvalidOperationException {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new IllegalArgumentException("Invalid credentials");
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }

        var user = userRepository.
                findUserByEmail(authRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));
        if(user.getRole() != authRequest.getRole()){
            throw new InvalidOperationException("The user doesn't have the role specified");
        }

        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }
}
