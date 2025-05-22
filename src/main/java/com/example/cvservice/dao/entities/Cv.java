package com.example.cvservice.dao.entities;


import com.example.cvservice.models.AppUser;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cv {
    @Id
    private String id;
    private String cvName;
    private String fullName;
    private String email;
    private String tel;
    private String photoUrl;
    private String title;
    private String country;
    private String gender;
    private String phone;
    private String state;
    private String linkedin;
    private String website;
    private String userId;
    @Transient
    private AppUser appUser;
    private String profession;
    @Column(length = 1024)
    private String summary;
    @ElementCollection
    private List<String> skills;
    @OneToMany
    private List<Experience> experiences;
    @OneToMany
    private List<Education> educations;

    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
}
