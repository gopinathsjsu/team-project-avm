package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.service.AdminService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RolesAllowed("STAFF")
@Validated
public class AdminController {
    private final AdminService adminService;
    @GetMapping({"/member"})
    public UserDetailsResponse getUserDetailsFromEmail(@RequestParam String email) throws RecordNotFoundException {
        return adminService.getUserDetailsFromEmail(email);
    }
    @PostMapping({"/member/checkIn"})
    public UserGymVisit checkInUserToGym(@RequestParam(required = true) Long gymId,
                                         @RequestParam(required = true) String email) throws RecordNotFoundException, InvalidOperationException, BadServerException {
        return adminService.checkInUsers(gymId, email);
    }
    @PutMapping({"/member/checkOut"})
    public UserGymVisit checkOutUserToGym(@RequestParam(required = true) Long userGymVisitId) throws InvalidOperationException {
        return adminService.checkOutUsers(userGymVisitId);
    }
    @GetMapping({"/member/currentCheckedInList"})
    public List<UserDetailsResponse> getAllCurrentCheckedInUsers(@RequestParam(required = true) Long gymId){
        return adminService.getAllCurrentCheckedInUsers(gymId);
    }
}
