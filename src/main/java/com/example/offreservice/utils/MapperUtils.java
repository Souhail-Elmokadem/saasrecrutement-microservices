package com.example.offreservice.utils;


import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperUtils {


    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
