package com.example.cvservice.services;

import com.example.cvservice.dao.entities.Cv;

import java.util.List;

public interface CvService {
    List<Cv> getAllCvs();
    Cv getCvById(String id);

    List<Cv> getCvByUserId(String userId);

    Cv saveCv(Cv cv);

    Cv updateCv(Cv cv);
}
