package com.example.offreservice.mappers;


import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.dao.entities.SavedJob;

public interface JobMapper {
    Job toJob(JobDTO jobDTO);
    JobDTO toJobDTO(Job job);

    SavedJobDTO toSavedJobDTO(SavedJobDTO savedJobDTO);
    SavedJobDTO toSavedJobDTO(SavedJob savedJob);
}
