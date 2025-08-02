package com.eventra.Controller;

import com.eventra.Utility.JwtUtils;
import com.eventra.service.JwtTokenBlackListService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogoutController {
    private final JwtUtils jwtUtils;
    private final JwtTokenBlackListService jwtTokenBlackListService;

    @Autowired
    public LogoutController(JwtUtils jwtUtils, JwtTokenBlackListService jwtTokenBlackListService) {
        this.jwtUtils = jwtUtils;
        this.jwtTokenBlackListService = jwtTokenBlackListService;
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {
        String token = getTokenFromCookies(request.getCookies());
        if (token != null) {
            if (jwtUtils.isTokenValid(token)) {
                long expiry = jwtUtils.extractExpiration(token);
                jwtTokenBlackListService.blackListToken(token, expiry);
            }
            ResponseCookie cookie = ResponseCookie.from("jwtToken", "")
                    .httpOnly(true)
                    .path("/")
                    .maxAge(0)
                    .sameSite("Lax")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok("Logout Successful");
        }
        return ResponseEntity.ok("User Already Logged Out");
    }

    private String getTokenFromCookies(Cookie[] cookies) {
        System.out.println("called getTokenFromCookies");
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
