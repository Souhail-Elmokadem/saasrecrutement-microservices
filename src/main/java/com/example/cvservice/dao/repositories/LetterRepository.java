package com.example.cvservice.dao.repositories;

import com.example.cvservice.dao.entities.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, String> {
    List<Letter> findByCvId(String cvId);
    List<Letter> findByUserid(String userid);

}
