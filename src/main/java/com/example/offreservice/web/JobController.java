package com.example.offreservice.web;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.ResponseApi;
import com.example.offreservice.dao.repositories.JobRepository;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseApi<JobDTO> findAll(
            @RequestParam(name = "kw",defaultValue = "") String kw,
            @RequestParam(name = "size" ,defaultValue = "6")  int size,
            @RequestParam(name = "page" , defaultValue = "0") int page
    ){

        Page<JobDTO> jobDTOPage = jobService.findAllByProfil(kw, page, size);
        return new ResponseApi<JobDTO>(jobDTOPage.getContent(),(int) jobDTOPage.getTotalElements(),(int)  jobDTOPage.getTotalPages());
    }


}
