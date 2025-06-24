package com.example.offreservice.mappers;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.dao.entities.SavedJob;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobMapperImpl implements JobMapper {

    @Autowired
    ModelMapper mapper;

    @Override
    public Job toJob(JobDTO jobDTO) {
        return mapper.map(jobDTO,Job.class);
    }

    @Override
    public JobDTO toJobDTO(Job job) {
        return mapper.map(job,JobDTO.class);
    }

    @Override
    public SavedJobDTO toSavedJobDTO(SavedJobDTO savedJobDTO) {
        return  mapper.map(savedJobDTO,SavedJobDTO.class);
    }

    @Override
    public SavedJobDTO toSavedJobDTO(SavedJob savedJob) {
        return mapper.map( savedJob,SavedJobDTO.class);
    }
}
