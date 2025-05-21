package com.example.user_service.dao.repositories;

import com.example.user_service.dao.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);

    Optional<AppUser> getById(String id);

}
