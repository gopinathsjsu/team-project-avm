package com.CMPE202.healthclub.entity.user.embeddableids;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class UserGymScheduleId implements Serializable {
    private Long scheduleId;
    private Long userId;
    public boolean equals(Object o) {
        return true;
    }
    public int hashCode() {
        return 0;
    }
}
