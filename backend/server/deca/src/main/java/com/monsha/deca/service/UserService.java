package com.monsha.deca.service;

import com.monsha.deca.dto.UserDTO;
import com.monsha.deca.entity.User;
import com.monsha.deca.entity.enums.ERole;
import com.monsha.deca.exception.UserExistException;
import com.monsha.deca.payload.request.SignupRequest;
import com.monsha.deca.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserService {
    public static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(SignupRequest userIn) {
    if (userRepository.existsByUsername(userIn.getUsername())) {
        throw new UserExistException("Username is already taken");
    }
    if (userRepository.existsByEmail(userIn.getEmail())) {
        throw new UserExistException("Email is already in use");
    }

    User user = new User();
    user.setEmail(userIn.getEmail());
    user.setFirstName(userIn.getFirstname());
    user.setLastname(userIn.getLastname());
    user.setUsername(userIn.getUsername());
    user.setPassword(passwordEncoder.encode(userIn.getPassword()));
    user.getRoles().add(ERole.ROLE_USER);

    LOG.info("Saving User {}", userIn.getEmail());
    return userRepository.save(user);
}


    public User updateUser(UserDTO userDTO, Principal principal) {
        User user = getUserByPrincipal(principal);
        user.setFirstName(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());

        return userRepository.save(user);
    }

    public User getCurrentUser(Principal principal) {
        return getUserByPrincipal(principal);
    }

    private User getUserByPrincipal(Principal principal) {
        String username = principal.getName();
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found with username " + username));

    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
