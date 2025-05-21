package com.example.user_service.service;

import com.example.user_service.dao.entity.AppUser;
import com.example.user_service.dao.repositories.UserRepo;
import com.example.user_service.dtos.LoginDto;
import com.example.user_service.dtos.RegisterDto;
import com.example.user_service.utils.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

public interface UserService {


    List<AppUser> findAll();


    AppUser getOrCreateUserFromToken(Authentication authentication, JwtUtils jwtUtils);

    Optional<AppUser> getById(String id);

    ResponseEntity<String> createUser(RegisterDto dto);

    String login(LoginDto loginRequest);
}
