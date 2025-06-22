package com.example.offreservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "text")
    private String title;

    @Column(columnDefinition = "text")
    private String company;

    @Column(columnDefinition = "text")
    private String location;

    @Column(columnDefinition = "text")
    private String signature;

    @Column(columnDefinition = "text")
    private String experience;

    @Column(columnDefinition = "text")
    private String education;

    @Column(name = "offer_metier", columnDefinition = "text")
    private String offerMetier;

    @Column(name = "logo_url", columnDefinition = "text")
    private String logoUrl;

    @Column(columnDefinition = "text")
    private String missions;

    @Column(columnDefinition = "text")
    private String profil;

    @Column(columnDefinition = "text")
    private String link;

    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



}
