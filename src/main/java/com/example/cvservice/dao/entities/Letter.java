package com.example.cvservice.dao.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Letter {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Nullable
    private String title;


    private String object;



    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private Date createdAt;
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private Cv cv;

    private String userid;
}
