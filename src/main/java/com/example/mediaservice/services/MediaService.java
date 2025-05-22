package com.example.mediaservice.services;

import com.example.mediaservice.dao.entities.Media;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MediaService {
    Media saveFile(MultipartFile file, String userId) throws IOException;

    Media saveMetadata(String path, MultipartFile file, String userId,String publicPath);

    ResponseEntity<Resource> download(String filename);
}
