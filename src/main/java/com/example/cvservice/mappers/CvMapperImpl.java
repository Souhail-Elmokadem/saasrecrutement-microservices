package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CvMapperImpl implements CvMapper{

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CvDto toCvDto(Cv cv) {
        return modelMapper.map(cv,CvDto.class);
    }

    @Override
    public Cv toCv(CvDto cvDto) {
        return modelMapper.map(cvDto,Cv.class);
    }
}
