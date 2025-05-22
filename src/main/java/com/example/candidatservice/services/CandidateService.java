package com.example.candidatservice.services;

import com.example.candidatservice.dao.entities.Candidate;

import java.util.List;

public interface CandidateService {


    List<Candidate> findAll();
}
