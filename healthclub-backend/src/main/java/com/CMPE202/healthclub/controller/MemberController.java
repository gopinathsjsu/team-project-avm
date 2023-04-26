package com.CMPE202.healthclub.controller;

import com.CMPE202.healthclub.entity.user.User;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import com.CMPE202.healthclub.model.UserDetailsResponse;
import com.CMPE202.healthclub.service.MemberService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RolesAllowed("MEMBER")
@Validated
public class MemberController {
    @Autowired
    private final MemberService memberService;
    @GetMapping({"/user"})
    public UserDetailsResponse getUserDetailsFromEmail(@RequestParam(required = true) String email) throws RecordNotFoundException {
        return memberService.getUserDetailsFromEmail(email);
    }
}
