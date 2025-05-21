package com.example.cvservice.services;

import com.example.cvservice.RestRepositories.UserService;
import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Experience;
import com.example.cvservice.dao.entities.Education;
import com.example.cvservice.dao.repositories.CvRepository;
import com.example.cvservice.dao.repositories.ExperienceRepository;
import com.example.cvservice.dao.repositories.FormationRepository;
import com.example.cvservice.models.AppUser;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public  class CvServiceimpl implements CvService {

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<Cv> getAllCvs() {
        return cvRepository.findAll();
    }

    @Override
    public Cv getCvById(String id) {
        return cvRepository.findById(id).get();
    }

    @Override
    public List<Cv> getCvByUserId(String userId) {
        return cvRepository.findCvByUserId(userId);
    }

    @Override
    public Cv saveCv(Cv cv) {

        try {

          AppUser appUser = userService.getUserById(cv.getUserId()).getBody(); // type responseEntity
            assert appUser != null;

            cv.setUserId(cv.getUserId());
            cv.setAppUser(appUser);
        } catch (Exception e) {
            throw new RuntimeException("Invalid user. Unable to save CV. Details: " + e.getMessage());
        }
        List<Experience> experiences = cv.getExperiences().stream().map(experience -> {
            return experienceRepository.save(experience);
        }).toList();
        List<Education> formations = cv.getEducations().stream().map(f->formationRepository.save(f)).toList();

        cv.setId(UUID.randomUUID().toString());
        cv.setCreatedAt(new java.util.Date());
        cv.setUpdatedAt(new java.util.Date());
        return cvRepository.save(cv);
    }

    @Override
    public Cv updateCv(Cv cv) {


        try {

            System.out.printf("etape 1");
            AppUser appUser = userService.getUserById(cv.getUserId()).getBody(); // type responseEntity
            assert appUser != null;



            cv.setAppUser(appUser);


        } catch (Exception e) {
            throw new RuntimeException("Invalid user. Unable to save CV. Details: " + e.getMessage());
        }
        System.out.printf("etape 2");
        Cv cvexist = cvRepository.findById(cv.getId()).orElseThrow(()->new RuntimeException("Not Found"));
        cvexist.setFullName(cv.getFullName());
        cvexist.setEmail(cv.getEmail());
        cvexist.setTel(cv.getTel());
        cvexist.setTitle(cv.getTitle());
        cvexist.setCountry(cv.getCountry());
        cvexist.setGender(cv.getGender());
        cvexist.setPhone(cv.getPhone());
        cvexist.setState(cv.getState());
        cvexist.setLinkedin(cv.getLinkedin());
        cvexist.setWebsite(cv.getWebsite());
        cvexist.setProfession(cv.getProfession());
        cvexist.setSummary(cv.getSummary());
        cvexist.setSkills(cv.getSkills());


        System.out.printf("etape 3");
        List<Experience> experiences = cv.getExperiences().stream()
                .map(experienceRepository::save)
                .collect(Collectors.toList());

        List<Education> formations = cv.getEducations().stream()
                .map(formationRepository::save)
                .collect(Collectors.toList());


        cvexist.setExperiences(experiences);
        cvexist.setEducations(formations);

        cv.setUpdatedAt(new java.util.Date());
        return cvRepository.save(cvexist);
    }
}
