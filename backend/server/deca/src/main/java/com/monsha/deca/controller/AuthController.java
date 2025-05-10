package com.monsha.deca.controller;

import org.springframework.stereotype.Controller;

import com.monsha.deca.model.UserForm;
import com.monsha.deca.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserForm form) {
        boolean success = userService.register(form);
        if (success) {
            return ResponseEntity.ok().body("Registration successful");
        } else {
            return ResponseEntity.badRequest().body("Username already exists");
        }
    }
}