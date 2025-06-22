package com.example.user_service.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String role;
}
