package com.example.candidatservice.dao.repositories;

import com.example.candidatservice.dao.entities.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
