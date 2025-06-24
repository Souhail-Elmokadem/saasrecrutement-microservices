package com.example.offreservice.RestRepositories;


import com.example.offreservice.Dtos.ResponseApi;
import com.example.offreservice.models.CvDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "cv-service",url = "http://localhost:8068/api/cv")
public interface CvService {

    @GetMapping("/get")
    ResponseApi<CvDto> getCvs();

}
