package com.example.cvservice.services;

import com.example.cvservice.RestRepositories.AiServiceImpl;
import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Letter;
import com.example.cvservice.dao.repositories.CvRepository;
import com.example.cvservice.dao.repositories.LetterRepository;
import com.example.cvservice.dtos.LetterDto;
import com.example.cvservice.dtos.LetterDtoResponse;
import com.example.cvservice.dtos.LetterResponseAi;
import com.example.cvservice.mappers.CvMapper;
import com.example.cvservice.mappers.LetterMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LettreServiceImpl implements LetterService{

    private final CvRepository cvRepository;
    private final LetterRepository letterRepository;
    private final LetterMapper letterMapper;
    private final AiServiceImpl letterAiService;
    private final CvMapper cvMapper;

    @Override
    public LetterDto generateAndSaveFromCv(String cvId) throws JsonProcessingException {
        Cv cv = cvRepository.findById(cvId).orElseThrow(() -> new RuntimeException("CV not found"));
        LetterResponseAi letterResponse = letterAiService.genererLettreDepuisCv(cvMapper.toCvDto(cv));
        System.out.printf("Letter Generer success");
        System.out.printf(letterResponse.getContent());
        Letter letter = new Letter();
        letter.setContent(letterResponse.getContent());
        letter.setObject(letterResponse.getObject());
        letter.setCreatedAt(new Date());
        letter.setCv(cv);
        letter = letterRepository.save(letter);
        cv.getLetters().add(letter);
        cvRepository.save(cv);
        return letterMapper.toLetterDto(letter);
    }

    @Override
    public LetterDto generateAndSaveFromCv(String cvId, String jobTitle) {
        return null;
    }

    @Override
    public LetterDto createLetter(LetterDtoResponse letterDto,String cvId) {
        Cv cv = cvRepository.findById(cvId).orElseThrow(() -> new RuntimeException("CV not found"));
        Letter letter = Letter.builder()
                .object(letterDto.getObject())
                .content(letterDto.getContent())
                .createdAt(new Date())
                .updatedAt(new Date())
                .userid(cv.getUserId())
                .cv(cv)
                .build();
        return letterMapper.toLetterDto(letterRepository.save(letter));
    }

    @Override
    public LetterDto updateLetter(String cvId, String letterId, LetterDtoResponse letterDto) {
        Letter letter = letterRepository.findById(letterId).orElseThrow(() -> new RuntimeException("Letter not found"));
        Cv cv = cvRepository.findById(cvId).orElseThrow(() -> new RuntimeException("CV not found"));
        assert letter != null;
        letter.setContent(letterDto.getContent());
        letter.setObject(letterDto.getObject());
        letter.setUpdatedAt(new Date());
        Letter letterSaved = letterRepository.save(letter);

        return letterMapper.toLetterDto(letterSaved);
    }

    @Override
    public List<LetterDto> getLettersByCvId(String cvId) {
        return letterRepository.findByCvId(cvId).stream().map(letterMapper::toLetterDto).collect(Collectors.toList());
    }

    @Override
    public LetterDto getLetterById(String id) {
        return letterMapper.toLetterDto(letterRepository.findById(id).get());
    }

    @Override
    public void deleteLetter(String id) {
        try
        {
        letterRepository.deleteById(id);
    }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<LetterDto> getLettersByUserId(String userId) {
        List<Letter> letters = letterRepository.findByUserid(userId);
        return letters.stream().map(letterMapper::toLetterDto).collect(Collectors.toList());
    }
}
