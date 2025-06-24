package com.example.offreservice.dao.repositories;


import com.example.offreservice.dao.entities.SavedJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    Page<SavedJob> findByUserIdAndJobTitleContainingIgnoreCase(String userId,String kw, PageRequest pageRequest);
    List<SavedJob> findByUserId(String userId);
}
