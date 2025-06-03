package com.example.cvservice.services;

import com.example.cvservice.dtos.LetterDto;
import com.example.cvservice.dtos.LetterDtoResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface LetterService {
    LetterDto generateAndSaveFromCv(String cvId) throws JsonProcessingException;
    LetterDto generateAndSaveFromCv(String cvId,String jobTitle);
    LetterDto createLetter(LetterDtoResponse letterDto,String cvId);
    LetterDto updateLetter(String cvId, String letterId, LetterDtoResponse letterDto);
    List<LetterDto> getLettersByCvId(String cvId);
    LetterDto getLetterById(String id);
    void deleteLetter(String id);

    List<LetterDto> getLettersByUserId(String userId);
}

