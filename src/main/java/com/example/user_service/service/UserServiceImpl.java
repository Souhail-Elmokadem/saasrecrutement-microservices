package com.example.user_service.service;


import com.example.user_service.dao.entity.AppUser;
import com.example.user_service.dao.repositories.UserRepo;
import com.example.user_service.dtos.LoginDto;
import com.example.user_service.dtos.RegisterDto;
import com.example.user_service.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    @Autowired
    private KeycloakAdminService keycloakAdminService;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public List<AppUser> findAll() {
        return userRepo.findAll();
    }

    @Override
    public AppUser getOrCreateUserFromToken(Authentication authentication, JwtUtils jwtUtils) {
        String id = jwtUtils.getUserIdFromJwt(authentication);
        System.out.printf("+++++++++++++++++++++++++");
        System.out.printf(id);
        return userRepo.getById(id).orElseGet(() -> {
            AppUser newUser = AppUser.builder()
                    .id(id)
                    .username(jwtUtils.getUsernameFromJwt(authentication))
                    .email(jwtUtils.getEmailFromJwt(authentication))
                    .firstName("")
                    .lastName("")
                    .createdAt(LocalDate.now())
                    .enabled(true)
                    .role(jwtUtils.getRoleFromJwt(authentication))
                    .build();
            return userRepo.save(newUser);
        });
    }

    @Override
    public Optional<AppUser> getById(String id) {
        return userRepo.getById(id);
    }


    @Override
    public ResponseEntity<String> createUser(RegisterDto dto){
        String userId = keycloakAdminService.createUser(
                dto
        );
        AppUser user = AppUser.builder()
                .id(userId)
                .username(dto.getUsername())
                .email(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .createdAt(LocalDate.now())
                .enabled(true)
                .role(dto.getRole())
                .build();

        userRepo.save(user);
        return ResponseEntity.ok("User created with ID: " + userId);
    }

    @Override
    public String login(LoginDto loginRequest) {
        return keycloakAdminService.getToken(loginRequest.getUsername(), loginRequest.getPassword());
    }
}
