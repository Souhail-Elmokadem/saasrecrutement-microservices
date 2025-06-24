package com.example.offreservice.services;

import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.dao.entities.SavedJob;
import com.example.offreservice.dao.repositories.JobRepository;
import com.example.offreservice.dao.repositories.SavedJobRepository;
import com.example.offreservice.mappers.JobMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedJobImpl implements SavedJobService {

    @Autowired
    private SavedJobRepository savedjobrepository;
    @Autowired
    private JobService jobService;


    @Autowired
    private JobMapper  jobMapper;
    @Autowired
    private JobRepository jobRepository;

    @Override
    public Page<SavedJobDTO> findAllByUserId(String userId,String kw,int page,int size) {
        return savedjobrepository.findByUserIdAndJobTitleContainingIgnoreCase(userId,kw, PageRequest.of(page,size)).map(jobMapper::toSavedJobDTO);
    }

    @Override
    public SavedJobDTO SaveJobToSavedList(Integer jobId,String userid) {
        Job job = jobRepository.findById(jobId).get();
        if (job == null) {
            return null;
        }
        SavedJob savedJob = SavedJob.builder()
                .userId(userid)
                .job(job)
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        return jobMapper.toSavedJobDTO(savedjobrepository.save(savedJob));
    }

    @Override
    @Transactional
    public boolean deleteJobFromSaved(Long savedjobId, String userid) {
        try {
            SavedJob savedjob = savedjobrepository.findById(savedjobId)
                    .orElseThrow(() -> new RuntimeException("NotFound"));

            if (!savedjob.getUserId().equals(userid)) {
                throw new RuntimeException("Unauthorized");
            }

            // Supprimer sans modifier la relation
            savedjobrepository.delete(savedjob);
            return true;
        } catch (Exception e) {
            System.out.println("Delete failed: " + e.getMessage());
            return false;
        }
    }
}
