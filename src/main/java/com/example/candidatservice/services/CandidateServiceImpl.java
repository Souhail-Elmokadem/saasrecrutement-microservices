package com.example.candidatservice.services;

import com.example.candidatservice.dao.entities.Candidate;
import com.example.candidatservice.dao.repositories.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateServiceImpl implements CandidateService {


    private final CandidateRepository candidateRepository;

    public CandidateServiceImpl(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    @Override
    public List<Candidate> findAll() {
        return candidateRepository.findAll();
    }
}
