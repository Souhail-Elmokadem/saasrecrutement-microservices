package com.example.offreservice.mappers;


import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.dao.entities.Job;

public interface JobMapper {
    Job toJob(JobDTO jobDTO);
    JobDTO toJobDTO(Job job);
}
