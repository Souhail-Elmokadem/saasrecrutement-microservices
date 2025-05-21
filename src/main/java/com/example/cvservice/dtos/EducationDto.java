package com.example.cvservice.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EducationDto {
     String degree;
     String school;
     String start_date;
     String end_date;
}
