package com.example.user_service.service;

import com.example.user_service.dtos.RegisterDto;

public interface KeycloakAdminService {
    String getToken(String username, String password);

    String createUser(RegisterDto dto);

    void deleteUser(String userId);

    void assignRole(String userId, String role);

    void resetPassword(String userId, String newPassword);
}
