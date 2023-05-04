package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import com.CMPE202.healthclub.entity.user.enums.REG_STATUS;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "UserSchedule")
public class UserSchedule {
    @EmbeddedId
    @JsonUnwrapped
    @Column(nullable = false, unique = true)
    private UserGymScheduleId id;
    @MapsId("scheduleId")
    @ManyToOne
    @JoinColumn(name = "scheduleId", referencedColumnName = "scheduleId")
    @JsonIncludeProperties({"startTime","endTime"})
    private GymSchedule gymSchedule;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @JsonIgnore
    //@JsonIncludeProperties({"id","firstName","lastName","email","homeGym","role"})
    private User user;

    private REG_STATUS registrationStatus;
}
