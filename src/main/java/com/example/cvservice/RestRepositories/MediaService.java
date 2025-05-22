package com.example.cvservice.RestRepositories;


import com.example.cvservice.models.MediaRest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "media-service", url = "http://localhost:8060/api/storages/media")
public interface MediaService {

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    MediaRest uploadFile(@RequestPart("file") MultipartFile file, @RequestPart("userId") String userId);
}
