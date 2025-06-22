package com.example.offreservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseApi<T>{
    List<JobDTO> items;
    int totalItems;
    int totalPages;
}
