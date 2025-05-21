package com.example.cvservice.models;

import lombok.*;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppUser {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private String role;
    private LocalDate createdAt;
    private boolean enabled;
}
