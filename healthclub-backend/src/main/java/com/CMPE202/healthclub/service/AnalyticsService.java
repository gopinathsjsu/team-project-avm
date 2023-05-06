package com.CMPE202.healthclub.service;


import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsRequest;
import com.CMPE202.healthclub.model.Admin.AdminAnalyticsResponse;
import com.CMPE202.healthclub.repository.GymClassScheduleRepository;
import com.CMPE202.healthclub.repository.GymRepository;
import com.CMPE202.healthclub.repository.UserGymVisitRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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
        //Find the number of visitors per business hours 6 am to 6 pm.
        //12 hours
        //12 slots
        //7 days

        return AdminAnalyticsResponse.builder()
                .endDate(adminAnalyticsRequest.getEndDate())
                .startDate(adminAnalyticsRequest.getStartDate())
                .enrollments(totalEnrollments)
                .enrollmentsPossible(totalEnrollmentsPossible)
                .totalHoursSpent(numberOfHoursVisited)
                .numberOfClasses(gymScheduleList.size())
                .userGymVisitList(userGymVisitRepository.findByGymAndCheckoutCheckInDateTime(gymId,startTime,endTime))
                .gymId(gymId)
                .build();
    }
}
