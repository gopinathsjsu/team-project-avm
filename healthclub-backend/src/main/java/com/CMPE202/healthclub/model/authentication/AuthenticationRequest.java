package com.CMPE202.healthclub.model.authentication;

import com.CMPE202.healthclub.entity.user.enums.ROLE;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationRequest {
    @NotNull
    @Email
    private String email;
    @NotNull
    private String password;
    @NotNull
    private ROLE role;
}
