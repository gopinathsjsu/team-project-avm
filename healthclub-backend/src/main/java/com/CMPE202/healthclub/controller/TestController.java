package com.CMPE202.healthclub.controller;

import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@NoArgsConstructor
@RequestMapping("/")
public class TestController {
    @GetMapping
    public String home() {
        return "<h1>Welcome to Health Club</h1>";
    }
}
