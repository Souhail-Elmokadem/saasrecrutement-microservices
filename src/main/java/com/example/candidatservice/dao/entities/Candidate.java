package com.example.candidatservice.dao.entities;


import com.example.candidatservice.models.Cv;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Candidate {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String userId;

    @Transient
    Cv cvUrl;

}
