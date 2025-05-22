package com.example.candidatservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CandidatServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CandidatServiceApplication.class, args);
    }

}
