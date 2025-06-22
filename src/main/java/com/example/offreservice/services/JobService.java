package com.example.offreservice.services;

import com.example.offreservice.Dtos.JobDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface JobService {
    List<JobDTO> findAll();

    Page<JobDTO> findAllByProfil(String kw, int page, int size);

    JobDTO findById(Long id);
    JobDTO save(JobDTO jobDTO);
    void deleteById(Long id);

}
