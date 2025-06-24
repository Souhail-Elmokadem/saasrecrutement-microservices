package com.example.offreservice.web;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.ResponseApi;
import com.example.offreservice.Dtos.ResponseStats;
import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.dao.entities.SavedJob;
import com.example.offreservice.dao.repositories.JobRepository;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.services.CommonService;
import com.example.offreservice.services.JobService;
import com.example.offreservice.services.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private SavedJobService savedJobService;

    @Autowired
    private CommonService commonService;

    @GetMapping
    public ResponseApi<JobDTO> findAll(
            @RequestParam(name = "kw",defaultValue = "") String kw,
            @RequestParam(name = "kwLocation",defaultValue = "") String kwLocation,
            @RequestParam(name = "size" ,defaultValue = "6")  int size,
            @RequestParam(name = "page" , defaultValue = "0") int page
    ){

        Page<JobDTO> jobDTOPage = jobService.findByTitleOrProfilOrLocationContaining(kw,kwLocation, page, size);
        return new ResponseApi<JobDTO>(jobDTOPage.getContent(),(int) jobDTOPage.getTotalElements(),(int)  jobDTOPage.getTotalPages());
    }


    @GetMapping("/saved")
    public ResponseApi<?> findAllByUserId(
            @RequestParam(name = "kw",defaultValue = "") String kw,
            @RequestParam(name = "kwLocation",defaultValue = "") String kwLocation,
            @RequestParam(name = "size" ,defaultValue = "6")  int size,
            @RequestParam(name = "page" , defaultValue = "0") int page
            ,Authentication authentication){
        String userid = commonService.getIdUserFromAuthentification(authentication);


        Page<SavedJobDTO> jobDTOS = savedJobService.findAllByUserId(userid,kw,page,size);
        return new ResponseApi<SavedJobDTO>(jobDTOS.getContent(),(int) jobDTOS.getTotalElements(),(int)jobDTOS.getTotalPages());
    }


    @PostMapping("/save/{JobId}")
    public ResponseEntity<?> SaveJobToSavedList(@PathVariable Integer JobId,Authentication  authentication){
        String userid = commonService.getIdUserFromAuthentification(authentication);
        return new ResponseEntity<>(savedJobService.SaveJobToSavedList(JobId,userid),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{savedJobId}")
    public ResponseEntity<?> DeleteJobFromSavedList(@PathVariable Long savedJobId,Authentication  authentication){
        String userid = commonService.getIdUserFromAuthentification(authentication);
        System.out.printf("savedJobId:%s",savedJobId);
        return new ResponseEntity<>(savedJobService.deleteJobFromSaved(savedJobId,userid),HttpStatus.OK);

    }
    @GetMapping("/recommended")
    public ResponseEntity<List<JobDTO>> getRecommendedJobs(Authentication authentication) {
        String userId = commonService.getIdUserFromAuthentification(authentication);
        List<JobDTO> recommended = jobService.getRecommendedJobsForUser(userId);
        return ResponseEntity.ok(recommended);
    }

    @GetMapping("/stats")
    public ResponseStats<JobDTO,SavedJobDTO> getStats(Authentication authentication) {
        List<SavedJobDTO> savedJobDTOS = jobService.getSavedJobsForUser(commonService.getIdUserFromAuthentification(authentication));
        return new ResponseStats<JobDTO,SavedJobDTO>(Objects.requireNonNull(getRecommendedJobs(authentication).getBody()).subList(0,4),savedJobDTOS.size()>4?savedJobDTOS.subList(0,4):savedJobDTOS,savedJobDTOS.size());

    }



}
