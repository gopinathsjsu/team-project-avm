package com.CMPE202.healthclub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gym_id")
    private Long id;
    private String name;
    private String city;
    private String state;
    private String country;
    private String address;
    @Column(columnDefinition = "POINT")
    private Point coordinate;
}
