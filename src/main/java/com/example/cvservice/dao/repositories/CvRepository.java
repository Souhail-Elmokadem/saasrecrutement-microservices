package com.example.cvservice.dao.repositories;

import com.example.cvservice.dao.entities.Cv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CvRepository extends JpaRepository<Cv, String> {
    Page<Cv> findCvByUserId(String id, PageRequest pageRequest);
    List<Cv> findCvByUserId(String id);
}
