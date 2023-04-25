package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.service.AdminService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RolesAllowed("STAFF")
public class AdminController {
    private final AdminService adminService;
    @GetMapping({"/member/"})
    public User getUserDetailsFromEmail(@RequestParam String email) throws RecordNotFoundException {
        return adminService.getUserByEmail(email);
    }
    @GetMapping({"/member/checkIn"})
    public Boolean checkInUserToGym(@RequestParam(required = true) Long gymId,
                                    @RequestParam(required = true) String email) throws RecordNotFoundException, InvalidOperationException {
        return adminService.checkInUsers(gymId, email);
    }
}
