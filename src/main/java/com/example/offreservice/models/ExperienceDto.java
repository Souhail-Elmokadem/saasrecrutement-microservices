package com.example.offreservice.models;


import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceDto {
    @JsonAlias({"job_title", "title"})
    String title;
    String company;
    String start_date;
    String end_date;
    String location;
    String description;
}
