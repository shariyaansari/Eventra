package com.eventra.Controller;

import com.eventra.Utility.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticityController {


    JwtUtils jwtUtils;
    @Autowired
    public AuthenticityController(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/check-cookie-authentication")
    public ResponseEntity<Boolean> isCookieAuthenticated(HttpServletRequest request) {
        Cookie[] cookie = request.getCookies();
        if (cookie != null) {
            for (Cookie c : cookie) {
                if (c.getName().equals("jwtToken")) {
                    String jwtToken = c.getValue();
                    if (jwtToken != null && jwtUtils.isTokenValid(jwtToken)) {
                        return ResponseEntity.ok(true);
                    }
                }
            }
        }
        return ResponseEntity.ok(false);
    }
}
