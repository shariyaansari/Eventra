package com.eventra.controller;

import com.eventra.entity.User;
import com.eventra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
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
        return ResponseEntity.ok(userInfos);
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
