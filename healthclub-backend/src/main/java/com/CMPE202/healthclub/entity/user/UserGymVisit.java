package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.gym.Gym;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
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
    @JsonIncludeProperties({"id","firstName","lastName","email"})
    private User user;
    private LocalDateTime checkinDateTime;
    private LocalDateTime checkoutDateTime;
}
