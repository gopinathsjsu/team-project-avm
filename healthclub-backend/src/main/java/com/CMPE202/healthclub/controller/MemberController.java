package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.UserActivityTracker;
import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.User.UserActivityRequest;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.model.User.UserGymScheduleBookRequest;
import com.CMPE202.healthclub.service.AnalyticsService;
import com.CMPE202.healthclub.service.MemberService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
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
@Validated
public class MemberController {
    @Autowired
    private final MemberService memberService;
    private final AnalyticsService analyticsService;
    @GetMapping({"/user/{email}"})
    @RolesAllowed({"MEMBER","FREE_TRIAL_MEMBER"})
    public UserDetailsResponse getUserDetailsFromEmail(@PathVariable(required = true)  @Email String email) throws RecordNotFoundException {
        return memberService.getUserDetailsFromEmail(email);
    }
    @PostMapping({"/user/book"})
    @RolesAllowed({"MEMBER","FREE_TRIAL_MEMBER"})
    public UserSchedule bookGymClassForUser (
            @RequestBody @Valid UserGymScheduleBookRequest userGymScheduleBookRequest) throws RecordNotFoundException, BadServerException, InvalidOperationException {
            return memberService.bookGymClassForUser(userGymScheduleBookRequest.getUserId(), userGymScheduleBookRequest.getScheduleId());
    }
    @GetMapping({"/user/{userId}/schedule"})
    @RolesAllowed({"MEMBER","FREE_TRIAL_MEMBER"})
    public List<UserSchedule> getUserClassSchedule(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return memberService.getUpcomingGymClassesForUser(userId);
    }
    @PostMapping({"/user/activity"})
    @RolesAllowed("MEMBER")
    public UserActivityTracker logActivityForUser (
            @RequestBody @Valid UserActivityRequest userActivityRequest)throws RecordNotFoundException, BadServerException {
        return memberService.logActivityForUser(userActivityRequest.getUserId(),
                                                userActivityRequest.getActivity(),
                                                userActivityRequest.getTimeInMinutes());
    }
    @GetMapping({"/user/{userId}/activity"})
    @RolesAllowed("MEMBER")
    public List<UserActivityTracker> getActivityOfUser(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return memberService.getActivityForUser(userId);
    }
    @GetMapping({"/user/{userId}/activity/last-90-days"})
    @RolesAllowed("MEMBER")
    public List<Object[]> getTotalMinutesByActivityLast90Days(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalMinutesByActivityLast90Days(userId);
    }
    @GetMapping({"/user/{userId}/activity/last-month"})
    @RolesAllowed("MEMBER")
    public List<Object[]> getTotalMinutesByActivityLastMonth(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalMinutesByActivityLastMonth(userId);
    }
    @GetMapping({"/user/{userId}/activity/last-week"})
    @RolesAllowed("MEMBER")
    public List<Object[]> getTotalMinutesByActivityLastWeek(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalMinutesByActivityLastWeek(userId);
    }

    @GetMapping({"/user/{userId}/schedule/last-month"})
    @RolesAllowed("MEMBER")
    public Integer getTotalHoursSpentInGymClassLastMonth(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalHoursSpentInGymClassLastMonth(userId);
    }
    @GetMapping({"/user/{userId}/schedule/last-90-days"})
    @RolesAllowed("MEMBER")
    public Integer getTotalHoursSpentInGymClassLast90Days(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalHoursSpentInGymClassLast90Days(userId);
    }
    @GetMapping({"/user/{userId}/schedule/last-week"})
    @RolesAllowed("MEMBER")
    public Integer getTotalHoursSpentInGymClassLastWeek(@PathVariable(required = true) Long userId) throws RecordNotFoundException {
        return analyticsService.getTotalHoursSpentInGymClassLastWeek(userId);
    }

}
