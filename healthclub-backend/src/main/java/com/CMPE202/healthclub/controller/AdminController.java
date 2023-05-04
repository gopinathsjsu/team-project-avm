package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.model.User.UserGymCheckInRequest;
import com.CMPE202.healthclub.model.User.UserGymCheckOutRequest;
import com.CMPE202.healthclub.service.AdminService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@RolesAllowed("STAFF")
@Validated
public class AdminController {
    private final AdminService adminService;
    @GetMapping({"/member/{email}"})
    public UserDetailsResponse getUserDetailsFromEmail(@PathVariable(required = true)  @Email String email) throws RecordNotFoundException {
        return adminService.getUserDetailsFromEmail(email);
    }
    @PostMapping({"/member/checkIn"})
    public UserGymVisit checkInUserToGym(@RequestBody @Valid UserGymCheckInRequest userGymCheckInRequest) throws RecordNotFoundException, InvalidOperationException, BadServerException {
        return adminService.checkInUsers(userGymCheckInRequest.getGymId(), userGymCheckInRequest.getEmail());
    }
    @PutMapping({"/member/checkOut"})
    public UserGymVisit checkOutUserToGym(@RequestBody @Valid UserGymCheckOutRequest userGymCheckOutRequest) throws InvalidOperationException {
        return adminService.checkOutUsers(userGymCheckOutRequest.getUserGymVisitId());
    }
    @GetMapping({"/member/currentCheckedInList/{gymId}"})
    public List<UserGymVisit> getAllCurrentCheckedInUsers(@PathVariable(required = true)  Long gymId) throws RecordNotFoundException{
        return adminService.getAllCurrentCheckedInUsers(gymId);
    }
}
