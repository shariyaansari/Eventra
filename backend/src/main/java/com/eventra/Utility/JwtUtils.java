package com.eventra.Utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {
    private final String secret = "your secret key";
    private final long expiryDate = 1000 * 60 * 60 * 2;    //2 hours or your expiry time
    private final long currentTime = System.currentTimeMillis();

    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String subject) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", subject);
        return createToken(claims);

    }

    public String createToken(Map<String, Object> claims) {
        return Jwts.builder()
                .claims(claims)
                .header()
                .type("JWT")
                .and()
                .issuedAt(new Date(currentTime))
                .expiration(new Date(currentTime + expiryDate))
                .signWith(getSecretKey(), Jwts.SIG.HS256)
                .compact();
    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public long extractExpiration(String token) {
        return getClaimsFromToken(token).getExpiration().getTime();
    }

    public boolean isTokenExpired(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getExpiration().before(new Date());
    }

    public boolean isTokenValid(String token) {
        try {
            return !isTokenExpired(token);
        } catch (JwtException e) {
            return false;
        }
    }
}
