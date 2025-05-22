package com.example.mediaservice.services;

import com.example.mediaservice.dao.Repositories.MediaRepository;
import com.example.mediaservice.dao.entities.Media;
import com.example.mediaservice.host.Host;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.UUID;

@Service
@Host
public class MediaServiceImpl implements MediaService{
    @Value("${media.upload.dir}")
    private String uploadDir ;


    private final MediaRepository mediaRepository;

    public MediaServiceImpl(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }


    @Override
    public Media saveFile(MultipartFile file, String userId) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String originalName = file.getOriginalFilename();
        String ext = "";
        int i = originalName.lastIndexOf('.');
        if (i > 0) ext = originalName.substring(i);
        String filename = userId + "_" + System.currentTimeMillis()+ UUID.randomUUID() + ext;
        Path filePath = uploadPath.resolve(filename);

        // Optionnel : vérification type/taille
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }
        if (file.getSize() > 5 * 1024 * 1024) { // 5MB max
            throw new IllegalArgumentException("File too large");
        }

        file.transferTo(filePath.toFile());

        filename = Host.hostname+Host.contextPath+filename;
        Media media = saveMetadata(filePath.toString(), file, userId,filename);
        return mediaRepository.save(media); // ou filePath.getFileName().toString() pour le nom seul
    }


    @Override
    public Media saveMetadata(String path, MultipartFile file, String userId,String publicPath) {
        Media media = new Media();
        media.setFilePath(path);
        media.setPublicPath(publicPath);
        media.setUserId(userId);
        media.setOriginalFileName(file.getOriginalFilename());
        media.setContentType(file.getContentType());
        media.setUploadedAt(new Date());
        return mediaRepository.save(media);
    }

    @Override
    public ResponseEntity<Resource> download(String filename) {
        // 1. Sécurité anti path traversal
        if (filename.contains("..")) {
            return ResponseEntity.badRequest().build();
        }

        try {
            // 2. Reconstitue le chemin du fichier à partir du nom (jamais le chemin absolu donné par l’utilisateur)
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 3. Détection du mime type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // 4. Rendre le fichier en inline (preview dans le navigateur)
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        }
        catch (IOException ex) {
            return ResponseEntity.internalServerError().build();
        }

    }
}
