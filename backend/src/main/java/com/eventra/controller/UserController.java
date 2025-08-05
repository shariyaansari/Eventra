package com.eventra.controller;

import com.eventra.exception.UnauthorizedAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@Slf4j
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getUserProfile() {
        log.info("Received request to get user profile");
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getName())) {
            log.warn("Unauthorized access attempt to user profile");
            throw new UnauthorizedAccessException("Authentication required to access user profile");
        }
        
        String email = authentication.getName();
        log.info("Retrieved profile for user: {}", email);
        
        Map<String, String> response = new HashMap<>();
        response.put("email", email);
        response.put("message", "User profile retrieved successfully");
        
        return ResponseEntity.ok(response);
    }
}
