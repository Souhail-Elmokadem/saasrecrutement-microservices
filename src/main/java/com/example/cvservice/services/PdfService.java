package com.example.cvservice.services;

import com.example.cvservice.dao.entities.Cv;

public interface PdfService {
    String generateCvPdf(Cv cv);
}
