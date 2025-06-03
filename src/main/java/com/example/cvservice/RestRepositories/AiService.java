package com.example.cvservice.RestRepositories;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.dtos.LetterResponseAi;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AiService {
    CvDto generateCvFromLocalFile(MultipartFile file) throws IOException;
    LetterResponseAi genererLettreDepuisCv(CvDto cvDto) throws JsonProcessingException;
}
