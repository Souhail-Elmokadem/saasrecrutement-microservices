package com.example.cvservice.services;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface CvService {
    List<Cv> getAllCvs();
    CvDto getCvById(String id);

    Page<CvDto> getCvByUserId(String userId,int page,int size);

    CvDto saveCv(Cv cv);

    CvDto saveCv(CvDto cv,String userId,MultipartFile photoFile);

    CvDto updateCv(CvDto cv,String userId,MultipartFile photoFile);

    CvDto createcvfromCvfile(MultipartFile file,String cvName, Authentication authentication) throws IOException;

    CvDto updateModel(String cvid,String modelName,  Authentication authentication);

    Boolean deleteCv(String CvId);


    Map<String,String> getStats(String userid);
}
