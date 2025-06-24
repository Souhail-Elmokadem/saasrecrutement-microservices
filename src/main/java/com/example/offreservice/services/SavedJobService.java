package com.example.offreservice.services;

import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.dao.entities.SavedJob;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SavedJobService {
    Page<SavedJobDTO> findAllByUserId(String userId,String kw, int page, int size);
    SavedJobDTO SaveJobToSavedList(Integer jobId,String userid);
    boolean deleteJobFromSaved(Long savedjobId,String userid);
}
