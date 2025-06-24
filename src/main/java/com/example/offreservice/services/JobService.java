package com.example.offreservice.services;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.SavedJobDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface JobService {
    List<JobDTO> findAll();

    Page<JobDTO> findByTitleOrProfilOrLocationContaining(String kw,String kwLocation, int page, int size);
    Page<JobDTO> findAllByLocation(String kw, int page, int size);

    JobDTO findById(Long id);
    JobDTO save(JobDTO jobDTO);
    void deleteById(Long id);

    JobDTO addListSavedJobs(JobDTO jobDTO);

    List<JobDTO> getRecommendedJobsForUser(String userId);
    List<SavedJobDTO> getSavedJobsForUser(String userId);
}
