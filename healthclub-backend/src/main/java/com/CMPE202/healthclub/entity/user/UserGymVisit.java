package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.CMPE202.healthclub.entity.user.embeddableids.UserGymVisitId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "UserGymVisit")
public class UserGymVisit {
    @EmbeddedId
    private UserGymVisitId id;
    @MapsId("gymId")
    @ManyToOne
    @JoinColumn(name = "gymId", referencedColumnName = "id")
    private Gym gym;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
    private LocalDateTime checkinDateTime;
    private LocalDateTime checkoutDateTime;
}
