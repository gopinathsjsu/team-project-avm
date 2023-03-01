package com.CMPE202.healthclub.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    public HomeController() {
    }
    @GetMapping({"/home"})
    public String home() {
        return "Welcome to Health Club";
    }
}
