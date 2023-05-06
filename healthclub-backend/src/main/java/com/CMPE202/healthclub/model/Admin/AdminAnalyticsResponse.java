package com.CMPE202.healthclub.model.Admin;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

import java.time.LocalDate;
import java.util.Map;

@NoArgsConstructor
@Setter
@Getter
@Builder
@AllArgsConstructor
public class AdminAnalyticsResponse {
    private Long gymId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfClasses;
    private Integer enrollments;
    private Integer enrollmentsPossible;
    private Integer totalHoursSpent;
    private Map<String, Integer[]> visitorCount;
}
