package com.eventra.service;

import com.eventra.dto.AuthResponse;
import com.eventra.dto.LoginRequest;
import com.eventra.dto.MessageResponse;
import com.eventra.dto.SignupRequest;
import com.eventra.entity.User;
import com.eventra.exception.InvalidCredentialsException;
import com.eventra.exception.UserAlreadyExistsException;
import com.eventra.exception.UserNotFoundException;
import com.eventra.repository.UserRepository;
import com.eventra.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public MessageResponse signup(SignupRequest signupRequest) {
        log.info("Attempting to register user with email: {}", signupRequest.getEmail());
        
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            log.warn("Registration failed: Email {} already exists", signupRequest.getEmail());
            throw new UserAlreadyExistsException("Email already exists!");
        }

        try {
            User user = new User();
            user.setFirstName(signupRequest.getFirstName());
            user.setLastName(signupRequest.getLastName());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            user.setEnabled(true);

            userRepository.save(user);
            log.info("User registered successfully: {}", signupRequest.getEmail());
            return new MessageResponse("User registered successfully!");
        } catch (Exception e) {
            log.error("Error during user registration: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to register user. Please try again.");
        }
    }

    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

            log.info("User logged in successfully: {}", loginRequest.getEmail());
            return new AuthResponse(jwt, user.getEmail(), user.getFirstName(), user.getLastName());
            
        } catch (BadCredentialsException e) {
            log.warn("Login failed for user {}: Invalid credentials", loginRequest.getEmail());
            throw new InvalidCredentialsException("Invalid email or password");
        } catch (UserNotFoundException e) {
            log.warn("Login failed for user {}: User not found", loginRequest.getEmail());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during login: {}", e.getMessage(), e);
            throw new RuntimeException("Login failed. Please try again.");
        }
    }
}
