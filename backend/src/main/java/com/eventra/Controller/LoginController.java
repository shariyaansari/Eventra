package com.eventra.Controller;

import com.eventra.Dto.UserDto;
import com.eventra.Utility.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto, HttpServletResponse response) {
        try {
            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));
            if (auth.isAuthenticated()) {
                String token = jwtUtils.generateToken(userDto.getEmail());
                ResponseCookie cookie = ResponseCookie
                        .from("jwtToken")
                        .value(token)
                        .httpOnly(true)
                        .path("/")
                        .maxAge(Duration.ofHours(2)) //or your time
                        .sameSite("Lax")
                        .build();
                response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
                return ResponseEntity.ok("Logged in successfully");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Error");
        }
        return ResponseEntity.ok("Wrong email or password");
    }
}
