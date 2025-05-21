package com.example.user_service.web;


import com.example.user_service.dao.entity.AppUser;
import com.example.user_service.service.UserService;
import com.example.user_service.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public List<AppUser> getUsers() {
        return userService.findAll();
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
    }




    @GetMapping("/users/force")
    public List<AppUser> getUsersforce() {
        return userService.findAll();
    }

    @GetMapping("/auth")
    public Authentication auth(Authentication authentication) {
        return authentication;
    }

    @GetMapping("/me")
    public ResponseEntity<AppUser> getMe(Authentication authentication) {
        AppUser user = userService.getOrCreateUserFromToken(authentication, jwtUtils);
        return ResponseEntity.ok(user);
    }



}
