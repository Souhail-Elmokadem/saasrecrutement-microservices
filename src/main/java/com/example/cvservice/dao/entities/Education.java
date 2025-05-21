package com.example.cvservice.dao.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Education {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    String degree;
    String school;
    String start_date;
    String end_date;

}
