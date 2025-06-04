package com.monsha.deca.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.deca.entity.User;
import com.monsha.deca.exception.EmailAlreadyExistsException;
import com.monsha.deca.payload.request.UpdateEmailRequest;
import com.monsha.deca.payload.response.UserResponseDTO;
import com.monsha.deca.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(@AuthenticationPrincipal User userDetails) {
        UserResponseDTO userDTO = userService.getUserDTOById(userDetails.getId());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/email")
    public ResponseEntity<?> updateEmail(@AuthenticationPrincipal User userDetails,
                                         @Valid @RequestBody UpdateEmailRequest request) {
        try {
            userService.updateEmail(userDetails.getId(), request.getNewEmail());
            return ResponseEntity.ok().build();
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email уже используется");
        }
    }
}
