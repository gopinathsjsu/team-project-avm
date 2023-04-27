package com.CMPE202.healthclub.entity.user.embeddableids;

import jakarta.persistence.Embeddable;
import jakarta.websocket.server.ServerEndpoint;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserGymScheduleId implements Serializable {
    private Long scheduleId;
    private Long userId;
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserGymScheduleId  other = (UserGymScheduleId ) obj;
        if (getScheduleId() == null) {
            if (other.getScheduleId() != null)
                return false;
        } else if (getScheduleId() !=other.getScheduleId())
            return false;
        if (getUserId() == null) {
            if (other.getUserId() != null)
                return false;
        } else if (!getUserId().equals(other.getUserId()))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hash(scheduleId, userId);
    }
}
