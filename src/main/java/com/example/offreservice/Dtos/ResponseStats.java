package com.example.offreservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseStats<T,J>{
    List<T> recommendedJobs;
    List<J> savedJobs;
    Integer totalSavedJobs;
}
