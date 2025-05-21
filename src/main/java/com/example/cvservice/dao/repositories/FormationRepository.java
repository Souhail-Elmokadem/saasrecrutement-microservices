package com.example.cvservice.dao.repositories;

import com.example.cvservice.dao.entities.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Education, Long> {
}
