package com.example.offreservice.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CvDto {
    private String id;
    private String fullName;
    private String email;
    private String tel;
    private String country;
    private String photoUrl;
    private String title;
    private String cvName;
    private String modeleName;
    private String gender;
    private String phone;
    private String state;
    private Date updatedAt;
    private String linkedin;
    private String website;
    private String userId;
    private String profession;
    private String summary;
    private List<String> skills;
    private List<ExperienceDto> experiences;
    private List<EducationDto> educations;
}
