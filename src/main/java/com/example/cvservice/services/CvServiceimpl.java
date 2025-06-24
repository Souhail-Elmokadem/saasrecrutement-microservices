package com.example.cvservice.services;

import com.example.cvservice.RestRepositories.AiService;
import com.example.cvservice.RestRepositories.MediaService;
import com.example.cvservice.RestRepositories.UserService;
import com.example.cvservice.common.services.CommonService;
import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Experience;
import com.example.cvservice.dao.entities.Education;
import com.example.cvservice.dao.entities.Letter;
import com.example.cvservice.dao.repositories.CvRepository;
import com.example.cvservice.dao.repositories.ExperienceRepository;
import com.example.cvservice.dao.repositories.FormationRepository;
import com.example.cvservice.dao.repositories.LetterRepository;
import com.example.cvservice.dtos.CvDto;
import com.example.cvservice.mappers.CvMapper;
import com.example.cvservice.models.AppUser;
import com.example.cvservice.models.MediaRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private AiService aiService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private UserService userService;

    @Autowired
    private MediaService mediaService;

    @Autowired
    private LetterRepository letterRepository;

    @Autowired
    private CvMapper cvMapper;
    @Override
    public List<Cv> getAllCvs() {
        return cvRepository.findAll();
    }

    @Override
    public CvDto getCvById(String id) {
        return cvMapper.toCvDto(cvRepository.findById(id).get());
    }

    @Override
    public Page<CvDto> getCvByUserId(String userId, int page, int size) {
        Page<Cv> cvs = cvRepository.findCvByUserId(userId, PageRequest.of(page,size));
        return cvs.map(cv -> cvMapper.toCvDto(cv));
    }

    @Override
    public CvDto saveCv(Cv cv) {

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
        return cvMapper.toCvDto(cvRepository.save(cv));
    }

    @Override
    public CvDto saveCv(CvDto cv, String userId, MultipartFile photoFile) {
        Cv cv1 = cvMapper.toCv(cv);
        cv1.setUserId(userId);
        if(photoFile!=null){
            MediaRest  media = mediaService.uploadFile(photoFile,userId);
            cv1.setPhotoUrl(media.getPublicPath());
        }
        return cvMapper.toCvDto(cvMapper.toCv(saveCv(cv1)));
    }

    @Override
    public CvDto updateCv(CvDto cv,String userId,MultipartFile photoFile) {


        try {

            System.out.printf("etape 1");
            AppUser appUser = userService.getUserById(userId).getBody();// type responseEntity
            assert appUser != null;


        } catch (Exception e) {
            throw new RuntimeException("Invalid user. Unable to save CV. Details: " + e.getMessage());
        }
        System.out.printf("etape 2");

        Cv cvexist = cvRepository.findById(cv.getId()).orElseThrow(()->new RuntimeException("Not Found"));
        if(photoFile!=null){
            MediaRest  media = mediaService.uploadFile(photoFile,userId);
            cvexist.setPhotoUrl(media.getPublicPath());
        }
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
                .map(cvMapper::toExperience)
                .map(experienceRepository::save)
                .collect(Collectors.toList());

        List<Education> formations = cv.getEducations().stream()
                .map(educationDto -> formationRepository.save(cvMapper.toEducation(educationDto)))
                .collect(Collectors.toList());


        cvexist.setExperiences(experiences);
        cvexist.setEducations(formations);

        System.out.printf("etape 4");
        cvexist.setUpdatedAt(new java.util.Date());
        return cvMapper.toCvDto(cvRepository.save(cvexist));
    }

    @Override
    public CvDto createcvfromCvfile(MultipartFile file, String cvName, Authentication authentication) throws IOException {
        String userId = commonService.getIdUserFromAuthentification(authentication);
        CvDto cvDto = aiService.generateCvFromLocalFile(file);
        System.out.printf("etape cv gnerated from ai finished");
        Cv cv = cvMapper.toCv(cvDto);
        System.out.printf("mapping to normal cv finished");
        cv.setUserId(userId);
        cv.setCvName(cvName);
        CvDto savedCv = saveCv(cv);
        System.out.printf("cv saved");
        //String pdfPath = pdfService.generateCvPdf(savedCv);
        return savedCv;
    }

    @Override
    public CvDto updateModel(String cvid, String modelName, Authentication authentication) {
        Cv cvexist = cvRepository.findById(cvid).orElseThrow(()->new RuntimeException("Not Found"));
        System.out.printf("first step 1");
        cvexist.setModeleName(modelName);
        System.out.printf("seccond step 1");
        Cv savedcv = cvRepository.save(cvexist);
        System.out.printf("third step 1");

        return cvMapper.toCvDto(savedcv);
    }

    @Override
    public Boolean deleteCv(String CvId){
        try {
            List<Letter> letters = letterRepository.findByCvId(CvId);
            letterRepository.deleteAll(letters);
            cvRepository.deleteById(CvId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }


    @Override
    public Map<String,String> getStats(String userid){
        Map<String,String> map = new HashMap<>();
        int cvnombres = cvRepository.findCvByUserId(userid).size();
        int letternombres = letterRepository.findByUserid(userid).size();
        map.put("cvnombres",String.valueOf(cvnombres));
        map.put("letternombres",String.valueOf(letternombres));
        return map;
    }
}
