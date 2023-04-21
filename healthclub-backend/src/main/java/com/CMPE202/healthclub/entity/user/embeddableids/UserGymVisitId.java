package com.CMPE202.healthclub.entity.user.embeddableids;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
@Embeddable
public class UserGymVisitId implements Serializable {
    private Long gymId;
    private Long userId;
    public boolean equals(Object o) {
        return true;
    }
    public int hashCode() {
        return 0;
    }
}
