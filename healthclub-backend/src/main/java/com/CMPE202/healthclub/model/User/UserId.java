package com.CMPE202.healthclub.model.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserId {
    @JsonProperty("userId")
    @NotNull
    private Long userId;
}
