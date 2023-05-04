package com.CMPE202.healthclub.model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserGymCheckOutRequest {
    @NotNull
    private Long userGymVisitId;
}
