package com.example.user_service.web;


import com.example.user_service.dtos.LoginDto;
import com.example.user_service.dtos.RegisterDto;
import com.example.user_service.service.KeycloakAdminService;
import com.example.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto dto) {
        System.out.printf("-----------------------");
        ResponseEntity<?> message = userService.createUser(dto);
        return ResponseEntity.ok("User created with ID: " + message.getBody());
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginRequest) {
        try {
            String token = userService.login(loginRequest);
            return ResponseEntity.ok(Map.of("access_token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
