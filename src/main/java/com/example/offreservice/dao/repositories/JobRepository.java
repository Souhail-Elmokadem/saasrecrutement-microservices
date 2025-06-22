package com.example.offreservice.dao.repositories;

import com.example.offreservice.dao.entities.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Integer> {
    Page<Job> findByTitleOrProfilContaining(String kwtitle,String kwprofile, PageRequest pageRequest);
}
