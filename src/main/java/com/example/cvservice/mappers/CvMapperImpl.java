package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Education;
import com.example.cvservice.dao.entities.Experience;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.dtos.EducationDto;
import com.example.cvservice.dtos.ExperienceDto;
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

    @Override
    public EducationDto toEducationDto(Education education) {

        return modelMapper.map(education,EducationDto.class);
    }

    @Override
    public Education toEducation(EducationDto educationDto) {
        return modelMapper.map(educationDto,Education.class);
    }

    @Override
    public ExperienceDto toExperienceDto(Experience experience) {
        return modelMapper.map(experience,ExperienceDto.class);
    }

    @Override
    public Experience toExperience(ExperienceDto experienceDto) {
        return modelMapper.map(experienceDto,Experience.class);
    }
}
