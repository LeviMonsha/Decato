package com.monsha.deca.service;

import com.monsha.deca.dto.UserDTO;
import com.monsha.deca.entity.User;
import com.monsha.deca.entity.enums.ERole;
import com.monsha.deca.exception.EmailAlreadyExistsException;
import com.monsha.deca.exception.UserExistException;
import com.monsha.deca.payload.request.SignupRequest;
import com.monsha.deca.payload.response.UserResponseDTO;
import com.monsha.deca.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.UUID;

@Service
public class UserService {
    public static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

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

        String avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userIn.getUsername();

        User user = new User();
        user.setEmail(userIn.getEmail());
        user.setFirstName(userIn.getFirstName());
        user.setLastName(userIn.getLastName());
        user.setUsername(userIn.getUsername());
        user.setIsAdult(userIn.getIsAdult());
        user.setGender(userIn.getGender());
        user.setPassword(passwordEncoder.encode(userIn.getPassword()));
        user.setAvatar(avatarUrl);
        user.getRoles().add(ERole.ROLE_USER);

        LOG.info("Saving User {}", userIn.getEmail());
        return userRepository.save(user);
    }

    public UserResponseDTO getUserDTOById(UUID userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    return new UserResponseDTO(
        user.getFirstName(),
        user.getLastName(),
        user.getUsername(),
        user.getEmail(),
        user.getIsAdult(),
        user.getGender(),
        user.getCreatedDate() != null ? user.getCreatedDate().toLocalDate() : null
    );
    }

    public User updateUser(UserDTO userDTO, Principal principal) {
        User user = getUserByPrincipal(principal);
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        return userRepository.save(user);
    }

    public void updateEmail(UUID userId, String newEmail) {
        if (userRepository.existsByEmail(newEmail)) {
            throw new EmailAlreadyExistsException(newEmail);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
        user.setEmail(newEmail);
        userRepository.save(user);
    }

    public User getCurrentUser(Principal principal) {
        return getUserByPrincipal(principal);
    }

    private User getUserByPrincipal(Principal principal) {
        String username = principal.getName();
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found with username " + username));
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
