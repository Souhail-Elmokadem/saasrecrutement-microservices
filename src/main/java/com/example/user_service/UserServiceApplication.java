package com.example.user_service;

import com.example.user_service.dao.entity.AppUser;
import com.example.user_service.dao.repositories.UserRepo;
import com.example.user_service.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(UserRepo userRepo) {
        return args -> {
           AppUser appUser = AppUser.builder()
                    .id("6egr65g6e5g1e451ge5")
//                   .("123456789")
                   .email("userApp@gmail.com")
                   .role("USER")
                   .build();
           userRepo.save(appUser);
        };
    }

}
