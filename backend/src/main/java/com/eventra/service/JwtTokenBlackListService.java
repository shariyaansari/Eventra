package com.eventra.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class JwtTokenBlackListService {
    private final HashMap<String, Long> blacklist = new HashMap<>();

    public void blackListToken(String token, long expiry) {
        blacklist.put(token, expiry);
    }

    public boolean isTokenBlackListed(String token) {

        Long expiry = blacklist.get(token);
        if (expiry == null) {
            return false;
        }
        if (System.currentTimeMillis() > expiry) {
            blacklist.remove(token);
        }
        return true;
    }
}
