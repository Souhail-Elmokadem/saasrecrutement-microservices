package com.example.offreservice.Dtos;

import com.example.offreservice.dao.entities.Job;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class SavedJobDTO {
    private Long savedJobId;
    private JobDTO job;
    private String userId;
}
