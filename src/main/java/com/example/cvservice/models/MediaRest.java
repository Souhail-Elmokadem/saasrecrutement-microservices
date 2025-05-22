package com.example.cvservice.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MediaRest {
    private String id;
    private String userId;
    private String filePath;
    private String publicPath;
    private String originalFileName;
    private String contentType;
    private Date uploadedAt;
}
