package com.CMPE202.healthclub.model.User;

import com.CMPE202.healthclub.entity.user.enums.ACTIVITY;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserActivityRequest {
    @NotNull
    private Long userId;
    @NotNull
    @Valid
    private ACTIVITY activity;
    @NotNull
    private Long timeInMinutes;

}
