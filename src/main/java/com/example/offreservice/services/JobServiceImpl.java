package com.example.offreservice.services;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.dao.repositories.JobRepository;
import com.example.offreservice.mappers.JobMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {


    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @Override
    public List<JobDTO> findAll() {
        return jobRepository.findAll().stream().map(jobMapper::toJobDTO).collect(Collectors.toList());
    }


    @Override
    public Page<JobDTO> findAllByProfil(String kw, int page, int size) {
        return jobRepository.findByTitleOrProfilContaining(kw,kw, PageRequest.of(page, size)).map(jobMapper::toJobDTO);
    }



    @Override
    public JobDTO findById(Long id) {
        return null;
    }

    @Override
    public JobDTO save(JobDTO jobDTO) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
