package com.DutyMatrix.security;

import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtils {

    @Value("${jwt.secret.key}")
    private String secret;

    @Value("${jwt.expiration.time}")
    private long expiration;

    private SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ Generate JWT
    public String generateToken(Long userId, String email, String role, Long stationId) {
        return Jwts.builder()
                .subject(email) // 👈 email stored here
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .claims(Map.of(
                        "userId", userId,
                        "role", role,
                        "stationId", stationId
                ))
                .signWith(key)
                .compact();
    }

    // ✅ Validate JWT
    public Claims validateToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // ✅ REQUIRED FOR RESET PASSWORD
    public String extractUsername(String token) {
        return validateToken(token).getSubject();
    }
}
