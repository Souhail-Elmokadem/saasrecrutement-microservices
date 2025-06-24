package com.example.offreservice.dao.repositories;

import com.example.offreservice.dao.entities.Job;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Integer> {
    @Query("SELECT j FROM Job j WHERE " +
            "(:kw IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :kw, '%')) OR " +
            "LOWER(j.profil) LIKE LOWER(CONCAT('%', :kw, '%'))) AND " +
            "(:kwLocation IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :kwLocation, '%')))")
    Page<Job> searchJobs(@Param("kw") String kw, @Param("kwLocation") String kwLocation, Pageable pageable);
    Page<Job> findByLocationContaining(String kwtitle, PageRequest pageRequest);

    List<Job> findTop10ByProfilContainingOrTitleContainingIgnoreCase(String kwtitle, String kwtitle2);

}
