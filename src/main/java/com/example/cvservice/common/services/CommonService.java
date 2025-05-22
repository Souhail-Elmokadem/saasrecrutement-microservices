package com.example.cvservice.common.services;

import org.springframework.security.core.Authentication;

public interface CommonService {
    String getIdCvFromAuthentification(Authentication authentication);
}
