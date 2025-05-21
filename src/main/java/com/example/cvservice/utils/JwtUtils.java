package com.example.cvservice.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class JwtUtils {

    public String getUserIdFromJwt(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt.getSubject();
    }

    public String getRoleFromJwt(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        @SuppressWarnings("unchecked")
        List<String> roles = (List<String>) realmAccess.get("roles");
        return roles.contains("ADMIN") ? "ADMIN" : (roles.contains("CANDIDAT") ? "CANDIDAT" : (roles.contains("RH") ? "RH" : "other"));
    }

    public String getUsernameFromJwt(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaim("preferred_username");
    }

    public String getEmailFromJwt(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaim("email");
    }
}
