package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.gym.Gym;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "UserGymVisit")
public class UserGymVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userGymVisitId;

    @ManyToOne
    @JoinColumn(name = "gymId", referencedColumnName = "id")
    private Gym gym;


    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
    private LocalDateTime checkinDateTime;
    private LocalDateTime checkoutDateTime;
}
