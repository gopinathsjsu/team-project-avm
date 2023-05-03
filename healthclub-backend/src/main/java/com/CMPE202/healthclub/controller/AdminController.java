package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.service.AdminService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @PostMapping({"/member/{email}/checkIn/{gymId}"})
    public UserGymVisit checkInUserToGym(@PathVariable(required = true)  Long gymId,
                                         @PathVariable(required = true)  @Email String email) throws RecordNotFoundException, InvalidOperationException, BadServerException {
        return adminService.checkInUsers(gymId, email);
    }
    @PutMapping({"/member/checkOut/{userGymVisitId}"})
    public UserGymVisit checkOutUserToGym(@PathVariable(required = true)  Long userGymVisitId) throws InvalidOperationException {
        return adminService.checkOutUsers(userGymVisitId);
    }
    @GetMapping({"/member/currentCheckedInList/{gymId}"})
    public List<UserGymVisit> getAllCurrentCheckedInUsers(@PathVariable(required = true)  Long gymId) throws RecordNotFoundException{
        return adminService.getAllCurrentCheckedInUsers(gymId);
    }
}
