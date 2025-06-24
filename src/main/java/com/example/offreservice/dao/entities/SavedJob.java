package com.example.offreservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long savedJobId;
    @ManyToOne @JoinColumn(name = "job_id", nullable = false)
    private Job job;
    private String userId;

    //i want add createdAt and UpdatedAt
    private Date createdAt;
    private Date updatedAt;
}
