package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Letter;
import com.example.cvservice.dtos.LetterDto;

public interface LetterMapper {
    LetterDto toLetterDto(Letter letter);
    Letter toLetter(LetterDto letterDto);
}
