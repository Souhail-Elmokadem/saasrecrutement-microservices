package com.example.user_service.dao.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private String role; // ex: candidat, admin, etc.
    private LocalDate createdAt;
    private boolean enabled;
}
