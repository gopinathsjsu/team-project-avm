package com.CMPE202.healthclub.entity.gym;

import com.CMPE202.healthclub.entity.user.UserGymVisit;
import com.CMPE202.healthclub.model.AttributeConverter.SQLServerGeographyAttributeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.geo.Point;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String city;
    private String state;
    private String country;
    @Column(unique = true)
    private String address;
    /*
    @Convert(converter = SQLServerGeographyAttributeConverter.class)
    @Column(columnDefinition = "POINT")
    private Point coordinate;
    */
    @JsonIgnore
    @OneToMany(mappedBy = "gym")
    private List<UserGymVisit> userGymVisitList;
    @JsonIgnore
    @OneToMany(mappedBy = "gym")
    private List<GymSchedule> gymScheduleList;
}
