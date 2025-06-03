package com.example.cvservice.web;


import com.example.cvservice.common.services.CommonService;
import com.example.cvservice.dtos.LetterDto;
import com.example.cvservice.dtos.LetterDtoResponse;
import com.example.cvservice.services.LetterService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    @Autowired
    private CommonService commonService;


    @PostMapping("/generate")
    public ResponseEntity<?> generateFromCv(@RequestParam String cvId) throws JsonProcessingException {
        return ResponseEntity.ok(letterService.generateAndSaveFromCv(cvId));
    }

    @GetMapping("/letter/{id}")
    public ResponseEntity<?> getLetter(@PathVariable String id) throws JsonProcessingException {
        return ResponseEntity.ok(letterService.getLetterById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLetters(@PathVariable String id) {
        return new ResponseEntity<>(letterService.getLettersByCvId(id), HttpStatus.OK);
    }

    @GetMapping("/byUser")
    public ResponseEntity<?> getLettersbyUser(Authentication authentication) {
        String userId = commonService.getIdUserFromAuthentification(authentication);
        System.out.printf("user id: %s\n", userId);
        return new ResponseEntity<>(letterService.getLettersByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLetter(@RequestPart LetterDtoResponse letterDto,@RequestPart String cvId) {
        return new ResponseEntity<>(letterService.createLetter(letterDto,cvId), HttpStatus.CREATED);
    }

    @PutMapping("/update/{cvId}/{letterId}")
    public ResponseEntity<?> updateLetter(@PathVariable String cvId,@PathVariable String letterId,@RequestPart LetterDtoResponse letterDto) {
        System.out.printf(letterId);
        return new ResponseEntity<>(letterService.updateLetter(cvId,letterId,letterDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{letterid}")
    public ResponseEntity<?> deleteLetter(@PathVariable String letterid) {
        letterService.deleteLetter(letterid);
        return new ResponseEntity<>("",HttpStatus.OK);
    }
}
