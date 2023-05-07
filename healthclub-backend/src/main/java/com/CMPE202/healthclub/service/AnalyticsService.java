package com.CMPE202.healthclub.service;


import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsRequest;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsResponse;
import com.CMPE202.healthclub.repository.GymClassScheduleRepository;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserActivityRepository;
import com.CMPE202.healthclub.repository.UserGymVisitRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnalyticsService {
    @Autowired
    private final GymRepository gymRepository;
    @Autowired
    private final UserGymVisitRepository userGymVisitRepository;
    @Autowired
    private  final GymClassScheduleRepository gymClassScheduleRepository;
    @Autowired
    private final UserActivityRepository userActivityRepository;
    private Gym getGymById(Long gymId) throws RecordNotFoundException {
        Optional<Gym> gym = gymRepository.findById(gymId);
        if(gym.isEmpty()){
            throw new RecordNotFoundException("Gym not found on records");
        }
        return gym.get();
    }
    /**
     * Analytics APIs
     * Location ID, Start Date, End Date
     * Total number of classes
     * Total number of enrollments
     * Total number of hours spend in the Gym
     * Number of visitors per hour per day between 10 to 6
     */
    public AdminAnalyticsResponse getAnalyticsResponse(Long gymId, AdminAnalyticsRequest adminAnalyticsRequest) throws RecordNotFoundException {
        Gym gym = getGymById(gymId);
        LocalDateTime startTime = adminAnalyticsRequest.getStartDate().atStartOfDay();
        LocalDateTime endTime = adminAnalyticsRequest.getEndDate().atStartOfDay();
        //Find the number of classes within the start and end dates in this location
        List<GymSchedule> gymScheduleList = gymClassScheduleRepository.findAllByGymStartAndEndTime(startTime, endTime, gymId);
        //Find the number of enrollments and total enrollments possible
        int totalEnrollments = 0;
        int totalEnrollmentsPossible = 0;
        for(GymSchedule gymSchedule: gymScheduleList){
            totalEnrollmentsPossible+= gymSchedule.getMaxOccupancy();
            totalEnrollments += gymSchedule.getSignUpList().size();
        }
        //Find the number of hours spent in the gym
        Integer numberOfHoursVisited = userGymVisitRepository.totalHoursByGymAndCheckoutCheckInDateTime(gymId,startTime,endTime);
        //Get the list of user gym checkin
        List<UserGymVisit> userGymVisitList = userGymVisitRepository.findByGymAndCheckoutCheckInDateTime(gymId,startTime,endTime);

        return AdminAnalyticsResponse.builder()
                .endDate(adminAnalyticsRequest.getEndDate())
                .startDate(adminAnalyticsRequest.getStartDate())
                .enrollments(totalEnrollments)
                .enrollmentsPossible(totalEnrollmentsPossible)
                .totalHoursSpent(numberOfHoursVisited)
                .numberOfClasses(gymScheduleList.size())
                .userGymVisitList(userGymVisitList)
                .gymId(gymId)
                .build();
    }

    public List<Object[]> getHoursSpentByDayWeekMonth(Long gymId, LocalDateTime startTime, LocalDateTime endTime) {
        return userGymVisitRepository.getHoursSpentByDayWeekMonth(gymId, startTime, endTime);
    }

    public List<Object[]> getVisitorsByHourDayOfWeekWeekendOrWeekday(Long gymId, LocalDateTime startTime, LocalDateTime endTime) {
        return userGymVisitRepository.getVisitorsByHourDayOfWeekWeekendOrWeekday(gymId, startTime, endTime);
    }
    public List<Object[]> getTotalMinutesByActivityLast90Days(Long userId){
        return userActivityRepository.getTotalMinutesByActivityLast90Days(userId);
    }
    public List<Object[]> getTotalMinutesByActivityLastWeek(Long userId){
        return userActivityRepository.getTotalMinutesByActivityLastWeek(userId);
    }
    public List<Object[]> getTotalMinutesByActivityLastMonth(Long userId){
        return userActivityRepository.getTotalMinutesByActivityLastMonth(userId);
    }


}
