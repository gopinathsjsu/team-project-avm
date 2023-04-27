package com.CMPE202.healthclub.entity.gym;

import com.CMPE202.healthclub.entity.user.UserSchedule;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GymSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;
    @ManyToOne
    @JoinColumn(name = "gymId", referencedColumnName = "id")
    private Gym gym;
    private String trainer;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int maxOccupancy;
    @JsonIgnore
    @OneToMany(mappedBy = "gymSchedule")
    private List<UserSchedule> signUpList;
}
