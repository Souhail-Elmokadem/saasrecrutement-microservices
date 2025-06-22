import { Component, OnInit } from '@angular/core';
import { Experience } from '../../../../../models/Experience';
import { Education } from '../../../../../models/Educations';
import { CvserviceService } from '../../../../../core/services/cv-service/cvservice.service';
import { Cv } from '../../../../../models/Cv';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creationcv',
  templateUrl: './creationcv.component.html',
  standalone:false,
  styleUrls: ['./creationcv.component.css'],
})
export class CreationcvComponent implements OnInit {
  
    // Contact Info
    fullName = '';
    email = '';
    phone = '';
    linkedin = '';
    website = '';
    state = '';
    country = '';
    summary='';
    title='';
    cvidparam:string='';
    cvName:string='';
    cv!:Cv;
  
  
    // Experience
    // experiences: { title: string; company: string; startDate: string; end_date: string; description: string; }[] = [
    //   { title: '', company: '', startDate: '', endDate: '', description: '' }
    // ];
  
    // Education
  
  

    constructor(private cvservice:CvserviceService,private route:Router,private active:ActivatedRoute){}
  ngOnInit(): void {
     this.cvidparam = this.active.snapshot.paramMap.get("id")!;
     this.cvName = this.active.snapshot.paramMap.get("name")!;

     if(this.cvidparam !=''){
          this.cvservice.getCvById(this.cvidparam).subscribe(
            {
              next:(data:any)=>{
                console.log("after call")
                this.cv=data;
                console.log("data")
                this.populateFormFromCv(this.cv)
                
              },
              error:err=>console.log(err)
            }
          )
     }

          
    
  }
  private populateFormFromCv(cv: Cv): void {
    this.fullName = cv.fullName || '';
    this.email = cv.email || '';
    this.phone = cv.phone || '';
    this.linkedin = cv.linkedin || '';
    this.website = cv.website || '';
    this.cvName=cv.cvName || '';
    this.state = cv.state || '';
    this.country = cv.country || '';
    this.summary = cv.summary || '';
    this.title = cv.title || '';
    this.skills = Array.isArray(cv.skills) ? cv.skills : [];
  
    this.experiences = Array.isArray(cv.experiences) && cv.experiences.length > 0
    ? cv.experiences.map(exp => ({
        ...exp,
        start_date: this.normalizeMonthFormat(exp.start_date),
        end_date: this.normalizeMonthFormat(exp.end_date)
      }))
    : [{
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        location: '',
        description: ''
      }];
  this.currentExperienceIndex = 0;
  
  this.educations = Array.isArray(cv.educations) && cv.educations.length > 0
  ? cv.educations.map(edu => ({
      ...edu,
      start_date: this.normalizeMonthFormat(edu.start_date),
      end_date: this.normalizeMonthFormat(edu.end_date)
    }))
  : [{
      school: '',
      degree: '',
      branch: '',
      start_date: '',
      end_date: ''
    }];
this.currentEducationIndex = 0;

  }

  normalizeMonthFormat(date?: string): string {
    if (!date) return '';
    return date.length === 4 ? `${date}-01` : date; // Si "2020" => "2020-01"
  }
  


photoFile?: File;
photoPreview: string | ArrayBuffer | null = null;

onPhotoSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input?.files?.[0];
  if (!file) return;

  // Option : tu peux vérifier le type et la taille ici
  if (!file.type.startsWith('image/')) {
    alert('Merci de choisir une image.');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('Image trop volumineuse (max 2 Mo).');
    return;
  }

  this.photoFile = file;
  // Générer un aperçu
  const reader = new FileReader();
  reader.onload = e => {
    this.photoPreview = reader.result;
  };
  reader.readAsDataURL(file);
}
    sections = [
      { label: 'Contact', value: 'contact' },
      { label: 'Experience', value: 'experience' },
      { label: 'Education', value: 'education' },
      { label: 'Skills', value: 'skills' },
      { label: 'Summary', value: 'summary' },
    ];
    
    currentSection: string = 'contact';
    
   
  
    
    currentExperienceIndex: number=0;
    currentEducationIndex: number=0;
  
    switchSection(section: string): void {
      this.currentSection = section;
    }
  
    openedMenuIndex: number | null = null;

toggleMenu(index: number): void {
  this.openedMenuIndex = this.openedMenuIndex === index ? null : index;
}
    addExperience(): void {
      if (this.experiences.length <= 3) {
      this.experiences.push({
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        location: '',
        description: ''
      });
      // this.currentExperienceIndex = this.experiences.length - 1;
    }
    }
    
    addEducation(): void {
      this.educations.push({
        school:'',
        degree:'',
        branch:'',
        start_date:'',
        end_date:''
      });
    }
  
    selectExperience(index: number): void {
      this.currentExperienceIndex = index;
    }
  
   
    
    experiences: Experience[]=[
      {
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        location: '',
        description: ''
      }
    ]; 
    educations: Education[]=[
      {
        school:'',
        degree:'',
        branch:'',
        start_date:'',
        end_date:'',
      }
    ];
    
    selectEducation(index: number): void {
      this.currentEducationIndex = index;
    }
  
    
    updateExperienceField(field: keyof Experience, value: string): void {
      this.experiences[this.currentExperienceIndex][field] = value;
    } 
    updateEducationField(field: keyof Education, value: string): void {
      this.educations[this.currentEducationIndex][field] = value;
    }
    
    removeExperience(index: number): void {
      if (this.experiences.length > 1) {
        this.experiences.splice(index, 1);
    
        // Réajuste l'index courant si nécessaire
        if (this.currentExperienceIndex >= this.experiences.length) {
          this.currentExperienceIndex = this.experiences.length - 1;
        }
      }
    }
    
    removeEducation(index: number): void {
      console.log("removeEducation called with index:", index);
      console.log("Current educations:", this.educations);
      this.educations.splice(index, 1);
    
      if (this.educations.length === 0 || this.educations.length === 1) {
        this.currentExperienceIndex = -1;
        return;
      }
    
      if (this.currentExperienceIndex >= this.educations.length) {
        this.currentExperienceIndex = this.educations.length - 1;
      }
    }
  
  
    
  
    newSkill: string = '';
skills: string[] = [];

addSkill() {
  const trimmed = this.newSkill.trim();
  if (trimmed && !this.skills.includes(trimmed)) {
    this.skills.push(trimmed);
  }
  this.newSkill = '';
}

removeSkill(index: number) {
  this.skills.splice(index, 1);
}

saveBasicInfo() {
      console.log('Contact saved', {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        linkedin: this.linkedin,
        website: this.website,
        state: this.state,
        country: this.country
      });
    }
    exportCv(): void {
      const cvData = {
        id:this.cvidparam,
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        cvName:this.cvName,
        linkedin: this.linkedin,
        website: this.website,
        modeleName: '', 
        state: this.state,
        photoUrl: '',
        updatedAt:'',
        title: this.title,
        country: this.country,
        summary: this.summary,
        skills: this.skills,
        experiences: this.experiences,
        educations: this.educations
      };
    
      this.cv = cvData;
    

      console.log(this.cvidparam)
    
      if(this.cvidparam != null){
        this.cvservice.updateCv(cvData,this.photoFile!).subscribe({
          next:(data:any)=>{
              console.log("success")
              console.log(data);
              this.route.navigateByUrl("/candidate/modele/"+data.cv.id)
          },
          error:err=>console.log(err)
        })
        console.log("✅ Exported CV Data:", this.cv);


      }else{
        this.cvservice.createCv(cvData,this.photoFile!).subscribe({
          next:(data:any)=>{
              console.log("success")
              console.log(data);
              this.route.navigateByUrl("/candidate/modele/"+data.cv.id)
          },
          error:err=>console.log(err)
        })
        console.log("✅ Exported CV Data:", this.cv);
      }
     

      
      // Optional: trigger download
      // const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'cv-export.json';
      // a.click();
      // window.URL.revokeObjectURL(url);

     
    }





    fillTestCv(): void {
      this.fullName = 'Souhail El Idrissi';
      this.email = 'souhail@gmail.com';
      this.phone = '+212600000000';
      this.linkedin = 'https://linkedin.com/in/souhail';
      this.website = 'https://souhail.dev';
      this.state = 'Casablanca';
      this.country = 'Maroc';
      this.summary = 'Développeur full stack passionné par le backend Java et le frontend Angular.';
      this.title="developer java junior"
    
      this.skills = ['Java', 'Spring Boot', 'Angular', 'Docker'];
    
      this.experiences = [
        {
          title: 'Développeur Backend',
          company: 'TechCorp',
          start_date: '2022-01',
          end_date: '2023-01',
          location: 'Rabat',
          description: 'Création d’API REST sécurisées avec Spring Boot et intégration Kafka.'
        },
        {
          title: 'Développeur frotend',
          company: 'Google',
          start_date: '2020-01',
          end_date: '2022-01',
          location: 'casablanca',
          description: 'Création des interfacesécurisées avec angular et tailwind.'
        }
      ];
    
      this.educations = [
        {
          school: 'ENSA',
          degree: 'Ingénieur',
          branch: 'Génie Logiciel',
          start_date: '2019-01',
          end_date: '2022-01'
        }
      ];
    
      this.currentExperienceIndex = 0;
      this.currentEducationIndex = 0;
    
      console.log("🎯 CV de test généré");
    }
    
  }