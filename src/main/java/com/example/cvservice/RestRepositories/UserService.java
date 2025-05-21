package com.example.cvservice.RestRepositories;

import com.example.cvservice.models.AppUser;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://localhost:8066/api/users")
public interface UserService {
    @GetMapping("/user/{id}")
    ResponseEntity<AppUser> getUserById(@PathVariable String id);
}