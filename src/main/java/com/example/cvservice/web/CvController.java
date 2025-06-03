package com.example.cvservice.web;

import com.example.cvservice.common.services.CommonService;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.dtos.ResponseCvApi;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.services.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/cv")
public class CvController {

    @Autowired
    private CvService cvService;

    @Autowired
    private CommonService commonService;



    @GetMapping
    public  ResponseEntity<?> listCvs(){
        return new ResponseEntity<>(cvService.getAllCvs(), HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public ResponseEntity<?> createCv(        @RequestPart("cv") CvDto cvDto,
                                              @RequestPart(value = "photo", required = false) MultipartFile photoFile,
                                              Authentication authentication) {

        String userid = commonService.getIdUserFromAuthentification(authentication);
        CvDto savedCv = cvService.saveCv(cvDto,userid,photoFile);
        return ResponseEntity.ok(Map.of("cv", savedCv));
    }


    @PostMapping("/update")
    @PreAuthorize("hasAuthority('CANDIDAT')")
    public ResponseEntity<?> updateCv(@RequestPart("cv") CvDto cvDto,
                                      @RequestPart(value = "photo", required = false) MultipartFile photoFile,Authentication authentication) {
        String userid = commonService.getIdUserFromAuthentification(authentication);
        CvDto updateCv = cvService.updateCv(cvDto,userid,photoFile);
        return ResponseEntity.ok(Map.of("cv", updateCv));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCvByUserId(
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "6") int size
            ,Authentication authentication){
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userid = jwt.getSubject();
        return new ResponseEntity<>(new ResponseCvApi<CvDto>(cvService.getCvByUserId(userid,page,size).getContent(),(int) cvService.getCvByUserId(userid,page,size).getTotalElements()),HttpStatus.OK);
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCvByCvId(@PathVariable String id){
        return new ResponseEntity<>(cvService.getCvById(id),HttpStatus.OK);
    }

    @PostMapping("/uploadcvfile")
    public ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file,@RequestParam("cvName") String cvName,Authentication authentication) throws IOException {
        CvDto saved = cvService.createcvfromCvfile(file,cvName,authentication);
        return ResponseEntity.ok(Map.of("cv", saved));
    }

    @PostMapping("/updateModele")
    public ResponseEntity<?> uploadModele(@RequestParam("cvId") String cvId,@RequestParam("modeleName") String modelName,Authentication authentication) throws IOException {
        Cv saved = cvService.updateModel(cvId,modelName,authentication);
        return ResponseEntity.ok(Map.of("cv", saved));
    }

    @DeleteMapping("/delete/{cvId}")
    public ResponseEntity<?> deleteCv(@PathVariable String cvId){
        return ResponseEntity.ok(cvService.deleteCv(cvId));
    }


}
