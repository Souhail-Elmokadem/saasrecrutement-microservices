package com.example.offreservice.Intercepteur;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Configuration
public class Intercepteur implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) auth;
        String token = jwt.getToken().getTokenValue();
        template.header("Authorization", "Bearer " + token);

    }
}

