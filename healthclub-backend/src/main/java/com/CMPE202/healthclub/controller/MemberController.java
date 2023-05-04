package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.model.User.UserGymScheduleBookRequest;
import com.CMPE202.healthclub.service.MemberService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RolesAllowed("MEMBER")
@Validated
public class MemberController {
    @Autowired
    private final MemberService memberService;
    @GetMapping({"/user/{email}"})
    public UserDetailsResponse getUserDetailsFromEmail(@PathVariable(required = true)  @Email String email) throws RecordNotFoundException {
        return memberService.getUserDetailsFromEmail(email);
    }
    @PostMapping({"/user/book"})
    public UserSchedule bookGymClassForUser (
            @RequestBody UserGymScheduleBookRequest userGymScheduleBookRequest)throws RecordNotFoundException, BadServerException {
            return memberService.bookGymClassForUser(userGymScheduleBookRequest.getUserId(), userGymScheduleBookRequest.getScheduleId());
    }
    @GetMapping({"/user/{userId}/schedule"})
    public List<UserSchedule> getUserClassSchedule(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return memberService.getUpcomingGymClassesForUser(userId);
    }

}
