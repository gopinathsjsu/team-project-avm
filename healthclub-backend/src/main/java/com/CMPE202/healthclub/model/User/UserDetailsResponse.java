package com.CMPE202.healthclub.model.User;

import com.CMPE202.healthclub.entity.user.enums.ROLE;
import lombok.*;

@NoArgsConstructor
@Setter
@Getter
@Builder
@AllArgsConstructor
public class UserDetailsResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private ROLE role;
    private Long homeGym;
}
