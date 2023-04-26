package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.gym.GymSchedule;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymScheduleId;
import com.CMPE202.healthclub.entity.user.enums.REG_STATUS;
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
    private UserGymScheduleId id;
    @MapsId("scheduleId")
    @ManyToOne
    @JoinColumn(name = "scheduleId", referencedColumnName = "scheduleId")
    private GymSchedule gymSchedule;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    private REG_STATUS registrationStatus;
}
