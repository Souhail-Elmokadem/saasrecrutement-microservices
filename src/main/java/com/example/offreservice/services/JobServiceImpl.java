package com.example.offreservice.services;

import com.example.offreservice.Dtos.JobDTO;
import com.example.offreservice.Dtos.ResponseApi;
import com.example.offreservice.Dtos.SavedJobDTO;
import com.example.offreservice.RestRepositories.CvService;
import com.example.offreservice.dao.entities.Job;
import com.example.offreservice.dao.repositories.JobRepository;
import com.example.offreservice.dao.repositories.SavedJobRepository;
import com.example.offreservice.mappers.JobMapper;
import com.example.offreservice.models.CvDto;
import feign.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {


    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CvService cvService;

    @Autowired
    private JobMapper jobMapper;
    @Autowired
    private SavedJobRepository savedJobRepository;

    @Override
    public List<JobDTO> findAll() {
        return jobRepository.findAll().stream().map(jobMapper::toJobDTO).collect(Collectors.toList());
    }


    @Override
    public Page<JobDTO> findByTitleOrProfilOrLocationContaining(String kw,String kwLocation, int page, int size) {
        return jobRepository.searchJobs(kw, kwLocation,PageRequest.of(page, size)).map(jobMapper::toJobDTO);
    }

    @Override
    public Page<JobDTO> findAllByLocation(String kw, int page, int size) {
        return jobRepository.findByLocationContaining(kw,PageRequest.of(page,size)).map(jobMapper::toJobDTO);
    }


    @Override
    public JobDTO findById(Long id) {
        return null;
    }

    @Override
    public JobDTO save(JobDTO jobDTO) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public JobDTO addListSavedJobs(JobDTO jobDTO) {
        return null;
    }

    @Override
    public List<JobDTO> getRecommendedJobsForUser(String userId) {
        ResponseApi<CvDto> list = cvService.getCvs();
        List<CvDto> cvDtoList = list.getItems();
        CvDto cv = list.getItems().get(0); // prend le 1er cv
        String[] keywords = extractKeywords(cv);

        List<Job> matchedJobs = jobRepository.findTop10ByProfilContainingOrTitleContainingIgnoreCase(
                keywords[0], keywords[0]
        );

        return matchedJobs.stream().map(jobMapper::toJobDTO).toList();
    }

    @Override
    public List<SavedJobDTO> getSavedJobsForUser(String userId) {
        List<SavedJobDTO> savedJobDTOList = savedJobRepository.findByUserId(userId).stream().map(jobMapper::toSavedJobDTO).toList();

        return savedJobDTOList;
    }

    private String[] extractKeywords(CvDto cv) {
        String profil = cv.getSummary() + " " + cv.getSkills();
        return profil.split("\\s+");
    }




}
