package com.example.cvservice.dao.repositories;

import com.example.cvservice.dao.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
