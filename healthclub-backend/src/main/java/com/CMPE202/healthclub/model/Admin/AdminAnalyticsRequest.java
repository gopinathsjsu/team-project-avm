package com.CMPE202.healthclub.model.Admin;

import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminAnalyticsRequest {
    private LocalDate startDate;
    private LocalDate endDate;
}
