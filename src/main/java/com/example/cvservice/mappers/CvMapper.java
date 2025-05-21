package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dtos.CvDto;

public interface CvMapper {
    CvDto toCvDto(Cv cv);
    Cv toCv(CvDto cvDto);
}
