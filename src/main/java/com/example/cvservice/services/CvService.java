package com.example.cvservice.services;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface CvService {
    List<Cv> getAllCvs();
    Cv getCvById(String id);

    List<Cv> getCvByUserId(String userId);

    Cv saveCv(Cv cv);

    CvDto saveCv(CvDto cv,String userId,MultipartFile photoFile);

    Cv updateCv(Cv cv);

    Cv createcvfromCvfile(MultipartFile file,String cvName, Authentication authentication) throws IOException;
}
