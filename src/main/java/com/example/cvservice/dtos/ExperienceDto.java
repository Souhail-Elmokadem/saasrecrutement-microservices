package com.example.cvservice.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceDto {
    @JsonProperty("job_title")
    String title;
    String company;
    String start_date;
    String end_date;
    String location;
    String description;
}
