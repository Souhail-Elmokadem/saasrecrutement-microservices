package com.example.mediaservice.dao.Repositories;

import com.example.mediaservice.dao.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media,String> {
}
