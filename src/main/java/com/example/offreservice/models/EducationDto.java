package com.example.offreservice.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EducationDto {
     String degree;
     String school;
     String branch;
     String start_date;
     String end_date;
}
