package com.CMPE202.healthclub.controller;


import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeController {
    public HomeController() {
    }
    @GetMapping({"/home"})
    public String home() {
        return "<h1>Welcome to Health Club</h1>";
    }
    @GetMapping({"/admin"})
    @RolesAllowed("STAFF")
    public String admin() {
        return "<h1>Welcome Admin</h1>";
    }
    @GetMapping({"/user"})
    @RolesAllowed("MEMBER")
    public String user() {
        return "<h1>Welcome User</h1>";
    }
}
