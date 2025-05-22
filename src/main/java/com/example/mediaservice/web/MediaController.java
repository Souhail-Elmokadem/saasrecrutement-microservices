package com.example.mediaservice.web;


import com.example.mediaservice.dao.entities.Media;
import com.example.mediaservice.services.MediaService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/storages/media")
public class MediaController {


    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId
    ) throws IOException {
        Media media = mediaService.saveFile(file, userId);
        return ResponseEntity.ok(media);
    }





    @Value( "${media.upload.dir}")
    private String uploadDir;

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> getMedia(@PathVariable String filename) {
        return mediaService.download(filename);
    }
}
