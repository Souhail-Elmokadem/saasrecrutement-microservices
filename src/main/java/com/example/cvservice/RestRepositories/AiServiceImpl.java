package com.example.cvservice.RestRepositories;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.dtos.LetterResponseAi;
import com.example.cvservice.mappers.CvMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class AiServiceImpl implements AiService{
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CvMapper cvMapper;

    @Override
    public CvDto generateCvFromLocalFile(MultipartFile file) throws IOException {

        Path tempFile = Files.createTempFile("cv_", ".pdf");
        file.transferTo(tempFile.toFile());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(tempFile));


        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        CvDto response = restTemplate.postForObject("http://127.0.0.1:8000/analyze", requestEntity, CvDto.class);

        System.out.printf("etape cv gnerated from ai");

        return response;
    }

    @Override
    public LetterResponseAi genererLettreDepuisCv(CvDto cvDto) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("cv", cvDto);

        ObjectMapper mapper = new ObjectMapper();

        cvDto.getExperiences().removeIf(exp -> exp.getTitle() == null || exp.getTitle().isBlank());

        System.out.printf("avent d'envoi +++++++++++++++++++++++++++");
        HttpEntity<CvDto> requestEntity = new HttpEntity<>(cvDto, headers);

        ResponseEntity<LetterResponseAi> response = restTemplate.exchange(
                "http://127.0.0.1:8000/genererLetter",
                HttpMethod.POST,
                requestEntity,
                LetterResponseAi.class
        );

        // Vérification et retour du contenu
        LetterResponseAi letter = response.getBody();
        if (letter == null || letter.getContent() == null) {
            throw new IllegalArgumentException("Lettre générée vide ou invalide");
        }

        return letter;

    }
}
