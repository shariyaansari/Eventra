package com.eventra.Controller;

import com.eventra.Dao.UserAuthRepo;
import com.eventra.Dto.UserDto;
import com.eventra.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class  RegisterationController {
    private final UserAuthRepo userAuthRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterationController(UserAuthRepo userAuthRepo, PasswordEncoder passwordEncoder) {
        this.userAuthRepo = userAuthRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            User user = new User();
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            userAuthRepo.save(user);
            return ResponseEntity.ok("user registered successfully");
        } catch (Exception e) {
            return ResponseEntity.ok("error" + e.getMessage());
        }
    }
}
