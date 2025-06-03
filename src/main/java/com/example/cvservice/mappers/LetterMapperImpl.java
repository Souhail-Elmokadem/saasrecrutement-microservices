package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Letter;
import com.example.cvservice.dtos.LetterDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LetterMapperImpl implements LetterMapper{

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public LetterDto toLetterDto(Letter letter) {

        return modelMapper.map(letter,LetterDto.class);
    }

    @Override
    public Letter toLetter(LetterDto letterDto) {
        return modelMapper.map(letterDto,Letter.class);
    }
}
