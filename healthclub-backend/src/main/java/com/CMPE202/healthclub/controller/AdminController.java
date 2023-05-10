package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.exceptions.BadServerException;
import com.CMPE202.healthclub.exceptions.InvalidOperationException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsRequest;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsResponse;
import com.CMPE202.healthclub.model.User.UserDetailsResponse;
import com.CMPE202.healthclub.model.User.UserGymCheckInRequest;
import com.CMPE202.healthclub.model.User.UserGymCheckOutRequest;
import com.CMPE202.healthclub.model.User.UserId;
import com.CMPE202.healthclub.service.AdminService;
import com.CMPE202.healthclub.service.AnalyticsService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@RolesAllowed("STAFF")
@Validated
public class AdminController {
    private final AdminService adminService;
    private final AnalyticsService analyticsService;
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
    /**
     * Analytics APIs
     * Location ID, Start Date, End Date
     * Total number of classes
     * Total number of enrollments
     * Total number of hours spend in the Gym
     * Number of visitors per hour per day between 10 to 6
     */
    @GetMapping("/analytics/{gymId}")
    public AdminAnalyticsResponse getAnalyticsResponse(@PathVariable Long gymId,
                                                       @RequestParam(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                       @RequestParam(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) throws RecordNotFoundException {

        AdminAnalyticsRequest adminAnalyticsRequest = new AdminAnalyticsRequest();
        adminAnalyticsRequest.setStartDate(startDate);
        adminAnalyticsRequest.setEndDate(endDate);

        return analyticsService.getAnalyticsResponse(gymId, adminAnalyticsRequest);
    }
    @GetMapping({"/analytics/{gymId}/hours-spent"})
    public List<Object[]> getHoursSpentByDayWeekMonth(@PathVariable(required = true)  Long gymId,
                                                      @RequestParam(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                      @RequestParam(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        AdminAnalyticsRequest adminAnalyticsRequest = new AdminAnalyticsRequest();
        adminAnalyticsRequest.setStartDate(startDate);
        adminAnalyticsRequest.setEndDate(endDate);
        return analyticsService.getHoursSpentByDayWeekMonth(gymId,
                adminAnalyticsRequest.getStartDate().atStartOfDay(),
                adminAnalyticsRequest.getEndDate().atStartOfDay()
        );
    }
    @GetMapping("/analytics/{gymId}/visitors-by-hour")
    public List<Object[]> getVisitorsByHourDayOfWeekWeekendOrWeekday(@PathVariable(required = true)  Long gymId,
                                                                     @RequestParam(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                     @RequestParam(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        AdminAnalyticsRequest adminAnalyticsRequest = new AdminAnalyticsRequest();
        adminAnalyticsRequest.setStartDate(startDate);
        adminAnalyticsRequest.setEndDate(endDate);
        return analyticsService.getVisitorsByHourDayOfWeekWeekendOrWeekday(gymId,
                adminAnalyticsRequest.getStartDate().atStartOfDay(),
                adminAnalyticsRequest.getEndDate().atStartOfDay());
    }
    @GetMapping("/free-trial-members")
    public List<User> getFreeTrialMembers() {
        return adminService.getFreeTrialMembers();
    }
    @PostMapping("/upgrade")
    public User upgradeMembership(@RequestBody(required = true) UserId userId) throws InvalidOperationException {
        return adminService.upgradeMembership(userId.getUserId());
    }
}
