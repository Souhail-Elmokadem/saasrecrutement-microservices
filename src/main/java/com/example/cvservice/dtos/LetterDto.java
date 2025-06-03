package com.example.cvservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LetterDto {
    private String id;
    private String content;
    private String object;
    private String updatedAt;
    private String cvId;
    private CvDto cv;
}
