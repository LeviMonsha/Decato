package com.monsha.deca.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.monsha.deca.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JWTTokenProvider {

    private static final Logger LOG = LoggerFactory.getLogger(JWTTokenProvider.class);
    private final SecretKey  secretKey = Keys.hmacShaKeyFor(SecurityConstants.SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("firstname", user.getFirstName());
        claims.put("lastname", user.getLastName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            LOG.error("JWT expired: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            LOG.error("Unsupported JWT: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            LOG.error("Invalid JWT format: {}", ex.getMessage());
        } catch (SignatureException ex) {
            LOG.error("Invalid signature: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            LOG.error("Empty claims: {}", ex.getMessage());
        }
        return false;
    }

    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        String idString = claims.get("id", String.class);
        return UUID.fromString(idString);
    }
}
