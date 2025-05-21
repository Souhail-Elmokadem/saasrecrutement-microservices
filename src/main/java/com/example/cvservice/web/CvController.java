package com.example.cvservice.web;

import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.mappers.CvMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.services.CvService;
import com.example.cvservice.services.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/api/cv")
public class CvController {

    @Autowired
    private CvService cvService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private CvMapper cvMapper;

    @Autowired
    private RestTemplate restTemplate;
    @GetMapping
    public  ResponseEntity<?> listCvs(){
        return new ResponseEntity<>(cvService.getAllCvs(), HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public ResponseEntity<?> createCv(@RequestBody Cv cv,Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        System.out.printf(jwt.getSubject());
        System.out.printf("+++++++++++++++++++++++");
        cv.setUserId(jwt.getSubject());
        Cv savedCv = cvService.saveCv(cv);
        //String pdfPath = pdfService.generateCvPdf(savedCv);
        return ResponseEntity.ok(Map.of("cv", savedCv));
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public ResponseEntity<?> updateCv(@RequestBody Cv cv,Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        System.out.printf(jwt.getSubject());
        System.out.printf("11111111111111");
        cv.setUserId(jwt.getSubject());
        System.out.printf(cv.toString());
        System.out.printf("-----------------");
        cvService.updateCv(cv);
        //String pdfPath = pdfService.generateCvPdf(savedCv);
        return ResponseEntity.ok(Map.of("cv", cv));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCvByUserId(Authentication authentication){
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userid = jwt.getSubject();
        return new ResponseEntity<>(cvService.getCvByUserId(userid),HttpStatus.OK);
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCvByCvId(@PathVariable String id){
        return new ResponseEntity<>(cvService.getCvById(id),HttpStatus.OK);
    }

    @PostMapping("/uploadcvfile")
    public ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file,@RequestParam("cvName") String cvName,Authentication authentication) throws IOException {
        Path tempFile = Files.createTempFile("cv_", ".pdf");
        file.transferTo(tempFile.toFile());
        // Préparer les headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // Corps de la requête
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(tempFile));
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        // Appel au service Python
        CvDto response = restTemplate.postForObject("http://127.0.0.1:8000/analyze", requestEntity, CvDto.class);
//        createCv(,authentication);
        Cv cv = cvMapper.toCv(response);
        cv.setCvName(cvName);
        return ResponseEntity.ok(createCv(cv,authentication));
    }


}
