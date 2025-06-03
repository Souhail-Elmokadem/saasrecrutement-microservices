package com.example.cvservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseCvApi<T>{
    Collection<T> items;
    int total;
}
