package com.eventra.controller;

import com.eventra.entity.User;
import com.eventra.exception.UnauthorizedAccessException;
import com.eventra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        log.info("Received request to get all users");
        
        // Check if user is authenticated and has admin role
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getName())) {
            log.warn("Unauthorized access attempt to admin endpoint");
            throw new UnauthorizedAccessException("Authentication required to access admin endpoints");
        }
        
        // TODO: Add role-based authorization check when roles are implemented
        // For now, we'll just check if the user is authenticated
        
        try {
            List<User> users = userRepository.findAll();
            List<UserInfo> userInfos = users.stream()
                    .map(user -> new UserInfo(
                        user.getId(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getCreatedAt(),
                        user.getEnabled()
                    ))
                    .collect(Collectors.toList());
            
            log.info("Retrieved {} users for admin", userInfos.size());
            return ResponseEntity.ok(userInfos);
        } catch (Exception e) {
            log.error("Error retrieving users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve users. Please try again.");
        }
    }

    // Inner class for user info without password
    public static class UserInfo {
        public Long id;
        public String email;
        public String firstName;
        public String lastName;
        public java.time.LocalDateTime createdAt;
        public Boolean enabled;

        public UserInfo(Long id, String email, String firstName, String lastName, 
                       java.time.LocalDateTime createdAt, Boolean enabled) {
            this.id = id;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.createdAt = createdAt;
            this.enabled = enabled;
        }
    }
}
