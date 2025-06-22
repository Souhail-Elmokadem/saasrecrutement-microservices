package com.example.offreservice.Dtos;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class JobDTO {

    private String title;

    private String company;

    private String location;

    private String signature;

    private String experience;

    private String offerMetier;

    private String logoUrl;

    private String missions;

    private String profil;

    private String link;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
