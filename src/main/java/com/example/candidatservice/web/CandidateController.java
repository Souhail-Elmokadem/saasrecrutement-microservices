package com.example.candidatservice.web;


import com.example.candidatservice.dao.entities.Candidate;
import com.example.candidatservice.services.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateService candidateService;
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }


    @GetMapping("/list")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return  new ResponseEntity<>(candidateService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
            return new ResponseEntity<>(new Candidate(), HttpStatus.CREATED);
    }
}
