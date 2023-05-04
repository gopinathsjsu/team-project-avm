package com.CMPE202.healthclub.entity.user;

import com.CMPE202.healthclub.entity.user.enums.ACTIVITY;
import com.CMPE202.healthclub.entity.user.enums.ROLE;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserActivityTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
    private LocalDateTime creationTime;
    private Long minutes;
    @Enumerated(EnumType.STRING)
    private ACTIVITY activity;
}
