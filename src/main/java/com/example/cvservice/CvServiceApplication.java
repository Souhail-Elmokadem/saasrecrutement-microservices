package com.example.cvservice;

import com.example.cvservice.dao.repositories.ExperienceRepository;
import com.example.cvservice.dao.repositories.FormationRepository;
import com.example.cvservice.services.CvService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class CvServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CvServiceApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(CvService cvService, FormationRepository formationRepository, ExperienceRepository experienceRepository) {
        return args -> {
            return ;
        };
    };
}
