package com.example.cvservice.mappers;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Education;
import com.example.cvservice.dao.entities.Experience;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.dtos.EducationDto;
import com.example.cvservice.dtos.ExperienceDto;

public interface CvMapper {
    CvDto toCvDto(Cv cv);
    Cv toCv(CvDto cvDto);
    EducationDto toEducationDto(Education education);
    Education toEducation(EducationDto educationDto);
    ExperienceDto toExperienceDto(Experience experience);
    Experience toExperience(ExperienceDto experienceDto);

}
